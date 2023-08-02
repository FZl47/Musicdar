import random
from django.db import models
from django.conf import settings
from django.urls import reverse
from django.utils.crypto import get_random_string
from core.models import BaseModel


def random_string(l=30):
    return get_random_string(l)


class MusicManager(models.Manager):

    def get_latest(self, count=12):
        return super(MusicManager, self).get_queryset().all()[:count]

    def get_trends(self, count=5):
        return super(MusicManager, self).get_queryset().all().order_by('-views')[:count]

    def create_unique_or_none(self, **kwargs):
        # Unique by 'name'
        if self.filter(name=kwargs['name']).exists():
            return None
        return self.create(**kwargs)


class Music(BaseModel):
    sku = models.CharField(max_length=30, default=random_string)
    name = models.CharField(max_length=200)
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE)
    cover_url = models.URLField(null=True)
    link_320 = models.URLField(null=True)
    link_128 = models.URLField(null=True)
    content = models.TextField(null=True)
    text = models.TextField(null=True)
    duration = models.CharField(max_length=5)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    views = models.PositiveBigIntegerField(default=0)

    objects = MusicManager()

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name

    def get_slug(self):
        name = self.name.replace(' ','-')
        return f'{self.id}-{name}'

    def get_absolute_url(self):
        return f"{settings.FULL_DOMAIN_URL}{reverse('music:music_detail', args=(self.get_slug(),))}"


class Podcast(Music):
    class Meta:
        ordering = ('-id',)


class ArtistManager(models.Manager):

    def get_random(self, count=5):
        objs = super(ArtistManager, self).get_queryset()
        try:
            return random.choices(objs, k=count)
        except IndexError as e:
            pass
        return objs[:count]

    def get_or_create(self, **kwargs):
        try:
            artist_obj = self.get(**kwargs)
        except models.ObjectDoesNotExist:
            artist_obj = self.create(**kwargs)
        return artist_obj

    def get_or_default(self, **kwargs):
        try:
            artist_obj = self.get(**kwargs)
        except models.ObjectDoesNotExist:
            try:
                artist_obj = self.get(name=settings.NAME_ARTIST_DEFAULT)
            except models.ObjectDoesNotExist:
                # create default artist
                artist_obj = self.create(name=settings.NAME_ARTIST_DEFAULT,is_default=True)
        return artist_obj

    def get_default(self):
        try:
            obj = self.get(name=settings.NAME_ARTIST_DEFAULT)
        except models.ObjectDoesNotExist:
            obj = self.create(name=settings.NAME_ARTIST_DEFAULT)
        return obj


class Artist(BaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    images_url = models.TextField(null=True, blank=True, default='', help_text='should split by "|" ')
    is_default = models.BooleanField(default=False)

    # gallery = models.ForeignKey('public.Gallery', on_delete=models.SET_NULL, null=True,blank=True)

    objects = ArtistManager()

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name


class CategoryManager(models.Manager):

    def get_or_default(self, **kwargs):
        try:
            category_obj = self.get(**kwargs)
        except models.ObjectDoesNotExist:
            try:
                category_obj = self.get(name=settings.NAME_CATEGORY_DEFAULT)
            except models.ObjectDoesNotExist:
                # create default category
                category_obj = self.create(name=settings.NAME_CATEGORY_DEFAULT)
        return category_obj


class Category(BaseModel):
    name = models.CharField(max_length=100)

    objects = CategoryManager()

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name


class NewsManager(models.Manager):

    def get_latest(self):
        pass


class News(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ('-id',)

    objects = NewsManager()
