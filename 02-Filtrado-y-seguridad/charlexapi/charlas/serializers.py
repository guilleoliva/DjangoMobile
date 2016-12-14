from django.contrib.auth import get_user_model
from drf_extra_fields.fields import Base64ImageField
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

    orador = OradorSerializer(read_only=True)
    lugar = LugarSerializer(read_only=True)


class UsuarioCharlaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuarioCharla
        fields = '__all__'

        extra_kwargs = {
            'usuario': {
                'allow_null': True,
                'required': False,
                'read_only': True
            }
        }

    def save(self, *args, **kwargs):
        request = self.context.get('request', None)

        if request and request.user:
            # Siempre pisamos el usuario
            # con el usuario registrado
            self.validated_data['usuario'] = request.user

        # Tratamos de traer una instancia existente
        try:
            instancia = UsuarioCharla.objects.get(
                charla=self.validated_data['charla'],
                usuario=self.validated_data['usuario']
            )
            self.instance = instancia
        except UsuarioCharla.DoesNotExist:
            pass

        return super().save(*args, **kwargs)


class FotoCharlaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FotoCharla
        fields = '__all__'
        filter_fields = ('charla',)

    foto = Base64ImageField()

    def save(self, *args, **kwargs):
        request = self.context.get('request', None)

        if request and request.user:
            # Siempre pisamos el usuario
            # con el usuario registrado
            self.validated_data['usuario'] = request.user

        return super().save(*args, **kwargs)
