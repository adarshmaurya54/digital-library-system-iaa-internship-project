from materials import views
from django.urls import path

urlpatterns = [
    path('', views.get_all_materials, name="get_all_materials"),
    path('approved_or_rejected/', views.get_all_approved_or_rejected_materials, name="get_all_approved_or_rejected_materials"),
    path('approved/', views.get_all_approved_materials, name="get_all_approved_materials"),
    path('upload/', views.upload_material, name="upload_material"),
    path("<int:pk>/approve/", views.approve_item, name="approve_item"),
    path("<int:pk>/reject/", views.reject_item, name="reject_item"),
    path("<int:pk>/delete/", views.delete_material, name="delete_material"),
    path("categories/", views.get_all_categories, name="get_all_categories"),
    path('categories/add/', views.add_category, name='add_category'),
    path('categories/<int:pk>/delete/', views.delete_category, name='delete_category'),
    path('tags/', views.get_unique_tags, name='get_unique_tags'),
]