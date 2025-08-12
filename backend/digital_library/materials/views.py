from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response   
from .serializers import MaterialSerializer
from rest_framework import status
from .models import Material
import os

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_material(request):
    serializer = MaterialSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Material uploaded successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_materials(request):
    materials = Material.objects.all()
    serializer = MaterialSerializer(materials, many=True)

    # Convert serialized data to list so we can modify it
    materials_data = serializer.data

    for material in materials_data:
        # Extract file type
        file_path = material.get("file", "")
        file_extension = os.path.splitext(file_path)[1].lower().replace('.', '')
        material["file_type"] = file_extension

        # Convert tags string into sub-object list
        tags_str = material.get("tags", "")
        if tags_str:
            material["tags"] = [tag.strip() for tag in tags_str.split(",") if tag.strip()]
        else:
            material["tags"] = []

    return Response(materials_data)