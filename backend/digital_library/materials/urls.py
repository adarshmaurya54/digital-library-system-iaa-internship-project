from materials import views
from django.urls import path

urlpatterns = [
    path('', views.get_all_materials, name="get_all_materials"),
    path('upload/', views.upload_material, name="upload_material"),
]