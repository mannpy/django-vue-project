from rest_framework import serializers
from ..models import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ['uuid', 'plot', 
            'writer', 'upvotes', 
            'created_at', 'updated_at']