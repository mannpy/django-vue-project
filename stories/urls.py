from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import IndexView
from .api.views import StoryViewSet

app_name = 'stories'

router = DefaultRouter()
router.register('stories', StoryViewSet, base_name='stories')

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('api/', include(router.urls), name='api'),
]
