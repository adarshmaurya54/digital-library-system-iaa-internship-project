from materials import views
from django.urls import path

urlpatterns = [
    path('', views.get_all_materials, name="get_all_materials"),
    path('approved/', views.get_all_approved_materials, name="get_all_approved_materials"),
    path('upload/', views.upload_material, name="upload_material"),
    path("<int:pk>/approve/", views.approve_item, name="approve_item"),
    path("<int:pk>/reject/", views.reject_item, name="reject_item"),
]