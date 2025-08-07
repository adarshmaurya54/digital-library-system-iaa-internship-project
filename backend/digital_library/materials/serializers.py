from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Material
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']  # Customize fields as needed

class MaterialSerializer(serializers.ModelSerializer):
    faculty = UserSerializer(read_only=True)
    class Meta:
        model = Material
        fields = '__all__'
        read_only_fields = ['faculty', 'approval_status', 'uploaded_at', 'reviewed_at']

    def create(self, validated_data):
        validated_data['faculty'] = self.context['request'].user
        return super().create(validated_data)
