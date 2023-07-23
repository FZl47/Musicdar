from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.api.exceptions import Conflict
from music import models
from . import serializers


class Test(APIView):

    def get(self, request):
        return Response('OK')


class Music(APIView):

    def post(self, request):
        s = serializers.MusicSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        data = s.validated_data
        # get Artist object by name or create
        artist_name = data.get('artist_name', None)
        if artist_name:
            artist_obj = models.Artist.objects.get_by_name_or_create(artist_name)
        else:
            artist_obj = models.Artist.objects.get_default()
        # get Category object by name or get default
        category_name = data.get('category_name', '')
        category_obj = models.Category.objects.get_by_name_or_default(category_name)

        data.pop('artist_name', None)
        data.pop('category_name', None)

        music_obj = models.Music.objects.create_unique_or_none(**data,
                                                               artist=artist_obj,
                                                               category=category_obj)
        if music_obj is None:
            # Music is duplicate
            raise Conflict('Music is duplicate')
        return Response(serializers.MusicResponseSerializer(music_obj).data,status=status.HTTP_201_CREATED)


class Artist(APIView):

    def post(self, request):
        pass
