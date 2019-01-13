from django.contrib import admin
from .models import Client, Transactie, Artikel, Saldo


admin.site.register(Client)
admin.site.register(Saldo)
admin.site.register(Transactie)
admin.site.register(Artikel)
