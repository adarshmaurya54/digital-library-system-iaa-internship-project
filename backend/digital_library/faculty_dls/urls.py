from faculty_dls import views
from django.urls import path



urlpatterns = [
    path('materials/', views.getFacultyMaterails, name="getFacultyMaterails"),
]