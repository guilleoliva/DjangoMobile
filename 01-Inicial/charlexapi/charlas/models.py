from django.db import models
from django.conf import settings


class Orador(models.Model):

    class Meta:
        verbose_name = "orador"
        verbose_name_plural = "oradores"

    nombre = models.CharField(verbose_name='nombre', max_length=100)
    bio = models.TextField(verbose_name='curriculum vitae')
    foto = models.ImageField(verbose_name='foto', upload_to='fotosorador')

    def __str__(self):
        return self.nombre


class Lugar(models.Model):

    class Meta:
        verbose_name = "lugar"
        verbose_name_plural = "lugares"

    nombre = models.CharField(verbose_name='nombre del lugar', max_length=100)

    def __str__(self):
        return self.nombre


class Charla(models.Model):

    class Meta:
        verbose_name = "charla"
        verbose_name_plural = "charlas"

    titulo = models.CharField(verbose_name='título', max_length=100)
    orador = models.ForeignKey(Orador, verbose_name='orador')
    lugar = models.ForeignKey(Lugar, verbose_name='lugar')
    hora = models.DateTimeField(verbose_name='hora')
    duracion = models.DurationField(verbose_name='duración')
    descripcion = models.TextField(verbose_name='descripción de la charla', null=True)

    asistentes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='UsuarioCharla',
        through_fields=('charla', 'usuario'),
        related_name='charlas'
    )

    fotos = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='FotoCharla',
        through_fields=('charla', 'usuario'),
        related_name='fotos_charlas'
    )

    def __str__(self):
        return "%s (%s)" % (self.titulo, self.orador.nombre)


class UsuarioCharla(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    charla = models.ForeignKey(Charla, on_delete=models.CASCADE)
    rating = models.IntegerField(verbose_name='rating', null=True)

    class Meta:
        unique_together = ('usuario', 'charla')

    def __str__(self):
        return "%s va a '%s'" % (self.usuario.username, self.charla.titulo)


class FotoCharla(models.Model):
    foto = models.ImageField(upload_to='fotoscharla')
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    charla = models.ForeignKey(Charla, on_delete=models.CASCADE)

    def __str__(self):
        return "Sacada por %s en '%s'" % (self.usuario.username, self.charla.titulo)
