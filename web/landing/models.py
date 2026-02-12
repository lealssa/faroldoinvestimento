from django.db import models

class Lead(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    interesse = models.CharField(max_length=50, choices=[
        ('consultoria', 'Consultoria'),
        ('sistema', 'Sistema'),
        ('ambos', 'Ambos')
    ])
    mensagem = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nome} - {self.interesse}"