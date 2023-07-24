# Generated by Django 4.2.3 on 2023-07-22 14:37

from django.db import migrations, models
import music.models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_alter_artist_images_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='music',
            name='sku',
            field=models.CharField(default=music.models.random_string, max_length=30),
        ),
        migrations.AlterField(
            model_name='music',
            name='cover_url',
            field=models.URLField(null=True),
        ),
    ]
