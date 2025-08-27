from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Material
import os
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_removed']  # Customize fields as needed

class MaterialSerializer(serializers.ModelSerializer):
    faculty = UserSerializer(read_only=True)
    file_type = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Material
        fields = '__all__'
        read_only_fields = ['faculty', 'approval_status', 'uploaded_at', 'reviewed_at']

    def create(self, validated_data):
        print(validated_data)
        validated_data['faculty'] = self.context['request'].user
        if "tags" in self.context['request'].data:
            validated_data['tags'] = self.context['request'].data.get("tags")
        return super().create(validated_data)

    def get_file_type(self, obj):
        """Extract file extension without the dot."""
        if obj.file:
            return os.path.splitext(obj.file.name)[1].lower().replace('.', '')
        return None

    def get_tags(self, obj):
        """Convert comma-separated string into a list."""
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(",") if tag.strip()]
        return []