from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Material
from .models import Category
import os
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_removed']  # Customize fields as needed

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        
class MaterialSerializer(serializers.ModelSerializer):
    faculty = UserSerializer(read_only=True)
    file_type = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    category = CategorySerializer(read_only=True)

    class Meta:
        model = Material
        fields = '__all__'
        read_only_fields = ['faculty', 'approval_status', 'uploaded_at', 'reviewed_at']

    def create(self, validated_data):
        validated_data['faculty'] = self.context['request'].user
        if "tags" in self.context['request'].data:
            validated_data['tags'] = self.context['request'].data.get("tags")
        return super().create(validated_data)

    def get_file_type(self, obj):
        if obj.file:
            return os.path.splitext(obj.file.name)[1].lower().replace('.', '')
        return None

    def get_tags(self, obj):
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(",") if tag.strip()]
        return []
