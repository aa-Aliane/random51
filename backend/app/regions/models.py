"models"
from django.contrib.gis.db import models


class Region(models.Model):
    """
    Region model
    """

    name = models.CharField(max_length=255)
    lat = models.FloatField()
    lng = models.FloatField()
