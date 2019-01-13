from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register('client', views.ClientView)
router.register('saldo', views.SaldoView)
router.register('artikel', views.ArtikelView)
router.register('transactie', views.TransactieView)

urlpatterns = [
    path('', include(router.urls)),
]
