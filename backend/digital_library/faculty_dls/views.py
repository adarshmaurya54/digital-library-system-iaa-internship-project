from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 
from materials.models import Material
from materials.serializers import MaterialSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def getFacultyMaterails(request):
    try:
        materials = Material.objects.filter(faculty=request.user)
        serializer = MaterialSerializer(materials, many=True)
        return Response(serializer.data)
    
    except AttributeError:
        return Response({"error": "Faculty profile not found for this user"}, status=400)