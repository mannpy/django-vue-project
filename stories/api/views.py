from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from ..models import Story
from .serializers import StorySerializer

class CustomPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'next_page_url': self.get_next_link(),
            'prev_page_url': self.get_previous_link(),
            'total': self.page.paginator.count,
            'current_page': self.page.number,
            'per_page': self.page_size,
            'from': self.page.start_index(),
            'to': self.page.end_index(),
            'last_page': len(self.page.paginator.page_range),
            'page_range': list(self.page.paginator.page_range),
            'results': data
        })



class StoryViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    lookup_field = 'uuid'