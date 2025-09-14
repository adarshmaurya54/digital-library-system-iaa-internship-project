from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Material(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    faculty = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tags = models.CharField(max_length=555, blank=True, default="")  
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    file = models.FileField(upload_to='materials/')
    approval_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
    
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
