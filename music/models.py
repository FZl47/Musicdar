from django.db import models
from core.models import BaseModel

class MusicManager(models.Manager):

    def get_latest(self):
        return super(MusicManager,self).get_queryset().all()[:12]

class Music(BaseModel):
    name = models.CharField(max_length=200)
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE)
    cover_url = models.URLField(null=True,default='') # TODO: default cover should set
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


class Podcast(Music):
    class Meta:
        ordering = ('-id',)


class Artist(BaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    images_url = models.TextField(null=True,default='',help_text='should split by "|" ')
    # gallery = models.ForeignKey('public.Gallery', on_delete=models.SET_NULL, null=True,blank=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name


class Category(BaseModel):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name


class News(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ('-id',)


