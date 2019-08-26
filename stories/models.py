import uuid as uuid_lib
from django.db import models
from django.urls import reverse


class TimeStapedModel(models.Model):
    """
    An abstract base class model that provides self-
    updating ''created_at'' and ''updated_at'' fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Story(TimeStapedModel):
    plot = models.CharField(max_length=200)
    writer = models.CharField(max_length=50)
    upvotes = models.PositiveIntegerField(default=0)
    uuid = models.UUIDField( # Used by the API to look up the record
        db_index=True,
        default=uuid_lib.uuid4,
        editable=False)

    ###
    def get_absolute_url(self):
        return reverse('stories:api', kwargs={'uuid': self.uuid})

    def __str__(self):
        return f'{ self.writer }: { self.plot} | { self.upvotes }'
    

