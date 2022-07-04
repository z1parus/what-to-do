from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path('', index, name='mainpage'),
    path('signup', signup, name = 'signup'),
    path('', include('django.contrib.auth.urls')),
]