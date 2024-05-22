"event viewset"
from events.models import Event
from events.serializers import event
from rest_framework import permissions, viewsets


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows events to be viewed or edited.
    """

    queryset = Event.objects.all()
    serializer_class = event.Serializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        "override the get_queryset method to order the queryset by created_at"
        queryset = Event.objects.all().order_by("-created_at")
        return queryset
