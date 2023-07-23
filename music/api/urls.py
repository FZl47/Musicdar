from django.urls import path
from . import views

app_name = 'music.api'
urlpatterns = [
    path('test',views.Test.as_view()),

    path('music',views.Music.as_view()),
]