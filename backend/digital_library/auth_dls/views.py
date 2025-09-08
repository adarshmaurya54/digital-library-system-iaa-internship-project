from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .serializers import UserSerializerWithToken
from .models import User  # custom user model
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict

# for sending mails and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import generate_token
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View

User = get_user_model()

@api_view(['GET'])
@permission_classes([AllowAny])
def getRoutes(request):
    return Response("Hello Adarsh")

@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    data = request.data
    try:
        # 1. Validate password match
        if data['password'] != data['cPassword']:
            return Response({
                "success": False,
                "message": "Passwords do not match."
            }, status=status.HTTP_400_BAD_REQUEST)
            
        # 2. Role handling
        role = data.get('role', 'Trainee')
        is_active = False  # default

        if role == 'Admin':
            if request.user.is_superuser:
                is_active = True  # only superuser can instantly activate Admin
            else:
                role = 'Trainee'  # downgrade silently if normal user tries Admin

        # 3. Create user
        user = User.objects.create(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            role=role,
            password=make_password(data['password']),
            is_active=is_active
        )

        # 4. Send activation email for non-admin
        if not is_active:
            email_subject = "Activate Your Account"
            message = render_to_string(
                "activate.html",
                {
                    "user": user,
                    "domain": "http://127.0.0.1:8000/",
                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                    "token": generate_token.make_token(user)
                }
            )
            email = EmailMessage(
                subject=email_subject,
                body=message,
                from_email=settings.EMAIL_HOST_USER,
                to=[user.email]
            )
            email.content_subtype = 'html'
            email.send()

        serializer = UserSerializerWithToken(user, many=False)
        return Response({
            "success": True,
            "message": "User registered successfully." if is_active else "User registered successfully. Please check your email to activate the account.",
            "user": serializer.data
        })

    except Exception as e:
        error_msg = str(e)

        if "UNIQUE constraint failed" in error_msg:
            if "username" in error_msg:
                message = {'success': False, 'message': 'User with this username already exists.'}
            elif "email" in error_msg:
                message = {'success': False, 'message': 'User with this email already exists.'}
            else:
                message = {'success': False, 'message': 'Duplicate entry error.'}
        else:
            message = {'success': False, 'message': f'Unexpected error: {error_msg}'}

        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    data = request.data
    try:
        email = data.get('email')
        password = data.get('password')
        role = data.get('loginRole')

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response({'success': False, 'message': 'User not found.'}, status=400)

        if user.is_removed:
            return Response({'success': False, 'message': 'User was removed.'}, status=400)
        
        if not user.check_password(password):
            return Response({'success': False, 'message': 'Incorrect password.'}, status=400)

        if user.role.lower() != role.lower():
            return Response({'success': False, 'message': "User role doesn't match"}, status=400)
        
        if not user.is_active:
            return Response({'success': False, 'message': 'Account not activated. Check your email.'}, status=400)

        serializer = UserSerializerWithToken(user, many=False)
        return Response({'success': True, 'message': "Login Successfully!", 'user': serializer.data})

    except Exception as e:
        return Response({'success': False, 'message': f'Login failed: {str(e)}'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUser(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    return Response({
        "success": True,
        "user": serializer.data
    })




class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception:
            user = None

        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.verified_email_at = timezone.now()
            user.save()
            return render(request, 'activatesuccess.html')
        else:
            return render(request, 'activatefailed.html')


# to get all the user (only admin can access this view)
@api_view(['GET'])
@permission_classes([IsAdminUser])  
def get_all_users(request):
    users = User.objects.all().values('id', 'first_name', 'last_name', 'email', 'role', 'is_active', 'date_joined', 'verified_email_at','is_removed', 'is_superuser')
    return Response({'success': True, 'users': users})

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    data = request.data['data']
    try:
        obj = get_object_or_404(User, pk=pk)
    except Http404:
        return Response(
            {'success': False, 'message': 'User not found'},
            status=404
        )
    obj.first_name = data['firstName']
    obj.last_name = data['lastName']
    obj.email = data['email']
    obj.is_active = data['active']
    obj.role = data['role']
    obj.save()
    user = {
        "id": obj.id,
        "first_name": obj.first_name,
        "last_name": obj.last_name,
        "email": obj.email,
        "role": obj.role,
        "is_active": obj.is_active,
        "date_joined": obj.date_joined,
        "verified_email_at": obj.verified_email_at,
        "is_removed": obj.is_removed,
        "is_superuser": obj.is_superuser,
    }
    return Response({'success': True,
                     "message": "User updated successfully",
                     'user': user})
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    try:
        obj = get_object_or_404(User, pk=pk)
    except Http404:
        return Response(
            {'success': False, 'message': 'User not found'},
            status=404
        )
    obj.is_removed = True
    obj.save()
    user = {
        "id": obj.id,
        "first_name": obj.first_name,
        "last_name": obj.last_name,
        "email": obj.email,
        "role": obj.role,
        "is_active": obj.is_active,
        "date_joined": obj.date_joined,
        "verified_email_at": obj.verified_email_at,
        "is_removed": obj.is_removed,
        "is_superuser": obj.is_superuser,
    }
    return Response({'success': True, 'message': "User removed successfully", 'user': user})

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUserRecord(request, pk):
    try:
        obj = get_object_or_404(User, pk=pk)
    except Http404:
        return Response(
            {'success': False, 'message': 'User not found'},
            status=404
        )
    obj.delete()
    return Response({'success': True, 'message': "User's record deleted successfully"})