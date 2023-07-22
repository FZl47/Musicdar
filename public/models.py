from django.db import models
from django.utils.crypto import get_random_string
from core.models import BaseModel
from core.utils import get_time


def src_image_upload(instance, path):
    frmt = str(path).split('.')[-1]
    n = get_time()
    y = n.year
    m = n.month
    d = n.day
    return f'images/{y}/{m}/{d}/{get_random_string(20)}.{frmt}'


class Gallery(BaseModel):
    title = models.CharField(max_length=300)
    images = models.ManyToManyField('Image')

    def __str__(self):
        return self.title


class Image(models.Model):
    img = models.ImageField(upload_to=src_image_upload)

    def __str__(self):
        return f'#{self.id} - img'
