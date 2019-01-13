from django.db import models


class Saldo(models.Model):
    saldo_aantal = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def __str__(self):
        return f"€{self.saldo_aantal}"


class Client(models.Model):
    class Meta:
        verbose_name_plural = "Clienten"
    
    client_voornaam = models.CharField(max_length=50)
    client_achternaam = models.CharField(max_length=100)
    client_saldo = models.ForeignKey(Saldo, on_delete=models.CASCADE, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.client_saldo:
            saldo = Saldo()
            saldo.save()
            self.client_saldo = saldo
        super(Client, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.client_voornaam} {self.client_achternaam} | €{self.client_saldo.saldo_aantal if self.client_saldo else 0}"


# class Kaart(models.Model):
#     class Meta:
#         verbose_name_plural = "Kaarten"
#     kaart_client = models.ForeignKey(Client, on_delete=models.SET_NULL, blank=True, null=True)

#     def __str__(self):
#         return str(self.kaart_client)


class Artikel(models.Model):
    class Meta:
        verbose_name_plural = "Artikelen"

    artikel_naam = models.CharField(max_length=250)
    artikel_prijs = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.artikel_naam


class Transactie(models.Model):
    transactie_artikelen = models.ManyToManyField(Artikel)
    transactie_datum = models.DateTimeField(auto_now_add=True)
    transactie_saldo_voor = models.DecimalField(max_digits=5, decimal_places=2)
    transactie_saldo_na = models.DecimalField(max_digits=5, decimal_places=2)
    transactie_client = models.ForeignKey(Client, on_delete=models.CASCADE)
