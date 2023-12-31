from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.api.exceptions import Conflict, NotFound
from music import models
from . import serializers


class Test(APIView):

    def get(self, request):
        return Response('OK')


class Music(APIView):

    def _get_artist_in_music_name(self, music_name):
        artist_names = music_name.split(' ')
        artist_object = models.Artist.objects.filter(name__in=artist_names).first()
        if artist_object:
            music_name = music_name.replace(artist_object.name,'')
        return music_name, artist_object

    def post(self, request):
        s = serializers.MusicCreateSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        data = s.validated_data
        # get Artist object by name or create
        artist_name = data.get('artist_name', None)
        create_singer = data.get('create_singer', False)

        # if artist name exists in music name then get artist object or create(if not exits)
        # and
        # remove artist name from music name
        music_name = data['name']
        music_name, artist_obj = self._get_artist_in_music_name(music_name)
        if artist_obj is None and artist_name and create_singer:
            artist_obj = models.Artist.objects.get_or_create(name=artist_name)
        else:
            artist_obj = models.Artist.objects.get_or_default(name=artist_name)

        # get Category object by name or get default
        category_name = data.get('category_name', '')
        category_obj = models.Category.objects.get_or_default(name=category_name)

        # Delete from data
        data.pop('name', None)
        data.pop('artist_name', None)
        data.pop('category_name', None)
        data.pop('create_singer', None)

        music_obj = models.Music.objects.create_unique_or_none(**data,
                                                               name=music_name,
                                                               artist=artist_obj,
                                                               category=category_obj)
        if music_obj is None:
            # Music is duplicate
            raise Conflict('Music is duplicate')
        return Response(serializers.MusicResponseSerializer(music_obj).data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        s = serializers.MusicDeleteSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        data = s.validated_data
        sku = data.get('sku')
        try:
            music_obj = models.Music.objects.get(sku=sku)
        except:
            raise NotFound('Music not found')
        music_obj.delete()
        return Response({
            'message': 'music deleted successfully !'
        })


class Artist(APIView):

    def post(self, request):
        pass
