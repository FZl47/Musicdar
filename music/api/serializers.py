from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from music import models


class MusicCreateSerializer(ModelSerializer):
    category_name = serializers.CharField(max_length=200, required=False)
    artist_name = serializers.CharField(max_length=20, required=False)
    create_singer = serializers.BooleanField(required=False)

    class Meta:
        model = models.Music
        exclude = ('id', 'views', 'artist', 'category')

    def validate(self, data):
        link_320 = data.get('link_320', None)
        link_128 = data.get('link_128', None)
        if not (link_320 or link_128):
            raise ValidationError('At least one of the links must be set (link_320 or link_128)')
        return data


class MusicResponseSerializer(ModelSerializer):
    url = serializers.URLField(source='get_absolute_url')

    class Meta:
        model = models.Music
        fields = ('sku', 'name', 'url')


class MusicDeleteSerializer(ModelSerializer):

    class Meta:
        model = models.Music
        fields = ('sku',)
