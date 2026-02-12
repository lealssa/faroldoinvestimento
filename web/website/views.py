from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
    return render(request, 'site/index.html')

def termos_uso(request):
    return render(request, 'site/termos_uso.html')

def politica_privacidade(request):
    return render(request, 'site/politica_privacidade_new.html')

def sitemap(request):
    template = loader.get_template('sitemap.xml')
    return HttpResponse(template.render({}, request), content_type='application/xml')