from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from materials.views import serve_material
urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("auth_dls.urls")),
    path("faculty/", include("faculty_dls.urls")),
    path("materials/", include("materials.urls")),
    path("media/<path:path>", serve_material, name="serve_material"),  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
