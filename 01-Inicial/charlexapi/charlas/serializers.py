from django.contrib.auth import get_user_model
from rest_framework import serializers
from charlas.models import (
    Orador,
    Lugar,
    Charla,
    UsuarioCharla,
    FotoCharla
)

User = get_user_model()


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'url', 'id')

    def save(self, *args, **kwargs):
        user = super().save(*args, **kwargs)
        user.set_password(self.validated_data['password'])
        user.save()
        return user


class OradorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Orador
        fields = ('nombre', 'bio', 'foto', 'url', 'id')


class LugarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lugar
        fields = '__all__'


class CharlaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Charla
        fields = (
            'titulo',
            'descripcion',
            'orador',
            'lugar',
            'hora',
            'duracion',
            'descripcion',
            'url',
            'id'
        )


class UsuarioCharlaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioCharla
        fields = '__all__'


class FotoCharlaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FotoCharla
        fields = '__all__'
