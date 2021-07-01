from rest_framework import serializers
from leads.models import Lead

#Lead serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadfields = '__all__'
    
    