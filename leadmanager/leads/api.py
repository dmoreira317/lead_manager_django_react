from leads.models import Lead
from rest_framework import viewsets, permissions

from .serializers import LeadSerializer

#Lead viewset (Full CRUD without specifying explicit methods for its functionality)

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer

    