from rest_framework.viewsets import ModelViewSet
from .models import Pizza
from .serializers import PizzaSerializer

class PizzaViewSet(ModelViewSet):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer