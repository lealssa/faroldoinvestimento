from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('consultoria/', views.consultoria, name='consultoria'),
    path('sistema/', views.sistema, name='sistema'),
    path('contato/', views.contato, name='contato'),
]