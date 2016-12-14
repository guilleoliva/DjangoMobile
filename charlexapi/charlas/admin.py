from django.contrib import admin

from charlas.models import Lugar, Orador, Charla, UsuarioCharla, FotoCharla


admin.site.register(Lugar)
admin.site.register(Orador)
admin.site.register(Charla)
admin.site.register(UsuarioCharla)
admin.site.register(FotoCharla)
