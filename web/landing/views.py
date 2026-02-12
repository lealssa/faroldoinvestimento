from django.shortcuts import render

def index(request):
    return render(request, 'landing/index.html')

def consultoria(request):
    return render(request, 'landing/consultoria.html')

def sistema(request):
    return render(request, 'landing/sistema.html')

def contato(request):
    return render(request, 'landing/contato.html')