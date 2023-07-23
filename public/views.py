from django.shortcuts import render
from music.models import Music, Artist, News, Podcast


def index(request):
    context = {
        'latest_musics': Music.objects.get_latest(),
        'trend_musics': Music.objects.get_trends(),
        'latest_podcasts': Podcast.objects.get_latest(),
        'artists': Artist.objects.get_random(12),
        'latest_news': News.objects.get_latest()
    }
    return render(request, 'index.html', context)
