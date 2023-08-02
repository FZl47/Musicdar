from django.urls import path
from . import views

app_name = 'music'
urlpatterns = [
    path('<str:slug>',views.music,name='music_detail')
]