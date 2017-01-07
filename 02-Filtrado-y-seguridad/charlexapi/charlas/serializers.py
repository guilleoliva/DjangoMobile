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
    """
    Serializer para interactuar con el modelo User de django.contrib.auth
    Lo único que tocamos acá es el método save para hashear el pass antes
    de guardar el objeto. Ojo: siempre que el cliente mande password o info
    sensible, el canal tiene que estar encriptado con SSL.
    """
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
    """
    Este serializer usa serializers anidados para Orador y Lugar
    notar que se definen como un campo común, pero en lugar de
    un tipo de campo como serializers.IntegerField, usamos directamente
    un serializer.
    Con esto logramos que ya venga la información del Orador y del Lugar
    incluido en el response, entonces en lugar de tener solo el link al
    orador, ahora tenemos su nombre, bio, foto, etc. Lo mismo con el lugar.
    """
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
    """
    Este serializer registra la asistencia y opinión de un usuario sobre una charla
    Pisamos el método save para asegurarnos de algunas cosas:
    1. Que el usuario que guardamos siempre sea el usuario que hizo un request (un
    usuario mal intencionado podría tratar de registrar la asistencia de otro usuario
    2. Registramos una sola vez por usuario la charla.
    """
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
            # Con esto nos aseguramos de que un usuario no pueda
            # votar en nombre de otro
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

    def save(self, *args, **kwargs):
        request = self.context.get('request', None)

        if request and request.user:
            # Siempre pisamos el usuario
            # con el usuario registrado
            self.validated_data['usuario'] = request.user

        return super().save(*args, **kwargs)
