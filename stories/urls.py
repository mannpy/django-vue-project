from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .api.views import StoryViewSet

app_name = 'stories'

router = DefaultRouter()
router.register('stories', StoryViewSet, base_name='stories')

urlpatterns = [
    path('api/', include(router.urls), name='api'),
    re_path('^.*$', 
        TemplateView.as_view(template_name="stories/index.html"), 
        name='app'),
]
