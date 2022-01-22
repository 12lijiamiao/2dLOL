from django.http import HttpResponse

def index(request):
    line = '<h1 style="text-align :center">Test<h1>'
    return HttpResponse(line)
