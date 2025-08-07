from faculty_dls import views
from django.urls import path



urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
]