from django.shortcuts import render
from rest_framework import viewsets, permissions

from .models import Client, Artikel, Transactie, Saldo
from .serializers import ClientSerializer, ArtikelSerializer, TransactieSerializer, SaldoSerializer


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class SaldoView(viewsets.ModelViewSet):
    queryset = Saldo.objects.all()
    serializer_class = SaldoSerializer


class ArtikelView(viewsets.ModelViewSet):
    queryset = Artikel.objects.all()
    serializer_class = ArtikelSerializer


class TransactieView(viewsets.ModelViewSet):
    queryset = Transactie.objects.all()
    serializer_class = TransactieSerializer
