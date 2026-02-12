from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('termos-de-uso/', views.termos_uso, name='termos_uso'),
    path('politica-privacidade/', views.politica_privacidade, name='politica_privacidade'),
    path('sitemap.xml', views.sitemap, name='sitemap'),
]