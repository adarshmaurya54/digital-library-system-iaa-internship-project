from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response   
from .serializers import MaterialSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Material
from django.utils import timezone
from django.http import Http404
import os
from django.http import FileResponse, Http404
from django.conf import settings
import mimetypes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_material(request):
    serializer = MaterialSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Material uploaded successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_materials(request):
    materials = Material.objects.filter(approval_status='Pending')
    serializer = MaterialSerializer(materials, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_approved_or_rejected_materials(request):
    materials = Material.objects.exclude(approval_status = 'Pending')
    serializer = MaterialSerializer(materials, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_approved_materials(request):
    materials = Material.objects.filter(
        approval_status='Approved',
        faculty__is_removed=False
    )
    serializer = MaterialSerializer(materials, many=True)
    return Response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def approve_item(request, pk):
    obj = get_object_or_404(Material, pk=pk)
    obj.approval_status = "Approved" 
    obj.reviewed_at = timezone.now()
    obj.save()
    return Response({'success':True,"message": "Item approved successfully"})

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def reject_item(request, pk):
    try:
        obj = get_object_or_404(Material, pk=pk)
    except Http404:
        return Response(
            {'success': False, 'message': 'Material not found'},
            status=404
        )

    obj.approval_status = "Rejected" 
    obj.reviewed_at = timezone.now()
    obj.save()
    return Response({'success':True,"message": "Item rejected successfully"})

@api_view(["DELETE"])
@permission_classes([IsAdminUser])  # or IsAuthenticated if you want faculty to delete their own
def delete_material(request, pk):
    obj = get_object_or_404(Material, pk=pk)

    # delete file from storage
    if obj.file and os.path.isfile(obj.file.path):
        os.remove(obj.file.path)

    # delete database record
    obj.delete()

    return Response({'success': True, 'message': 'Material deleted successfully'})

def serve_material(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    if not os.path.exists(file_path):
        raise Http404("File not found")

    content_type, _ = mimetypes.guess_type(file_path)
    response = FileResponse(open(file_path, "rb"), content_type=content_type)
    response["Content-Disposition"] = f'inline; filename="{os.path.basename(file_path)}"'
    return response