from rest_framework.serializers import HyperlinkedModelSerializer, SerializerMethodField, ModelSerializer

from .models import Client, Transactie, Artikel, Saldo


# class KaartSerializer(ModelSerializer):
#     saldo = SerializerMethodField()
#     class Meta:
#         model = Kaart
#         fields = (
#             'id',
#             'kaart_client',
#             'saldo'
#         )

#     def get_saldo(self, obj):
#         if obj.saldo_set.first():
#             return f"€{str(obj.saldo_set.first().saldo_aantal)}"

class SaldoSerializer(ModelSerializer):
    class Meta:
        model = Saldo
        fields = (
            'id',
            'saldo_aantal',
        )


class ClientSerializer(HyperlinkedModelSerializer):
    saldo = SerializerMethodField()
    class Meta:
        model = Client
        fields = (
            'id',
            'client_voornaam',
            'client_achternaam',
            'client_saldo',
            'saldo',
        )
        extra_kwargs = {
            'client_saldo': {
                'read_only': True
            }
        }

    def get_saldo(self, obj):
        if obj.client_saldo:
            return f"€{obj.client_saldo.saldo_aantal}"


class ArtikelSerializer(ModelSerializer):
    class Meta:
        model = Artikel
        fields = (
            'id',
            'artikel_naam',
            'artikel_prijs',
        )


class TransactieSerializer(HyperlinkedModelSerializer):
    
    transactie_artikelen_namen = SerializerMethodField()

    class Meta:
        model = Transactie
        fields = (
            'id',
            'transactie_artikelen',
            'transactie_artikelen_namen',
            'transactie_datum',
            'transactie_client',
            'transactie_saldo_voor',
            'transactie_saldo_na',
        )
        extra_kwargs = {
            "transactie_saldo_voor": {
                "read_only": True,    
            },
            "transactie_saldo_na": {
                "read_only": True,
            }
        }

    def get_transactie_artikelen_namen(self, obj):
        if obj.transactie_artikelen:
            return [artikel.artikel_naam for artikel in obj.transactie_artikelen.all()]

    def create(self, validated_data):
        client = validated_data['transactie_client']
        artikelen = validated_data['transactie_artikelen']
        artikel_prijzen = [artikel.artikel_prijs for artikel in artikelen]
        saldo = client.client_saldo.saldo_aantal
        nieuwe_saldo = saldo - sum(artikel_prijzen)
        client.client_saldo.saldo_aantal = nieuwe_saldo
        
        transactie = Transactie(transactie_client=client, transactie_saldo_voor=saldo, transactie_saldo_na=nieuwe_saldo)
        transactie.save()
        
        client.client_saldo.save()
        transactie.transactie_artikelen.set(artikelen)
        return validated_data
