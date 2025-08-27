from auth_dls import views
from django.urls import path


urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
    path('user/registration/', views.registerUser, name='registerUser'),
    path('user/login/', views.loginUser, name='loginUser'),
    path('user/profile/', views.getCurrentUser, name='get-current-user'),
    path('all-users/', views.get_all_users, name='get_all_users'),
    path('activate/<uidb64>/<token>/', views.ActivateAccountView.as_view(), name='activate'),
    path('user/<int:pk>', views.updateUser, name='updateUser'),
    path('user/<int:pk>/delete/', views.deleteUser, name='deleteUser'),
]