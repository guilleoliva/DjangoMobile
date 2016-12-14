from django.contrib.auth import get_user_model
from rest_framework import viewsets

from charlas.serializers import (
    UsuarioSerializer,
    OradorSerializer,
    LugarSerializer,
    CharlaSerializer,
    UsuarioCharlaSerializer,
    FotoCharlaSerializer
)

from charlas.models import (
    Orador,
    Lugar,
    Charla,
    UsuarioCharla,
    FotoCharla
)

User = get_user_model()


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer


class OradorViewSet(viewsets.ModelViewSet):
    queryset = Orador.objects.all()
    serializer_class = OradorSerializer


class LugarViewSet(viewsets.ModelViewSet):
    queryset = Lugar.objects.all()
    serializer_class = LugarSerializer


class CharlaViewSet(viewsets.ModelViewSet):
    queryset = Charla.objects.all()
    serializer_class = CharlaSerializer


class UsuarioCharlaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioCharla.objects.all()
    serializer_class = UsuarioCharlaSerializer


class FotoCharlaViewSet(viewsets.ModelViewSet):
    queryset = FotoCharla.objects.all()
    serializer_class = FotoCharlaSerializer
