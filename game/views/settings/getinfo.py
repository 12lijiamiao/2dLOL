from django.http import JsonResponse
from game.model.player.player import Player

def getinfo_acapp(request):
    pass
def getinfo_web(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            "result" : "未登录",
        })
    else:
        player = Player.objects.get(user=user);
        return JsonResponse({
            'result':"success",
            'username': player.user.username,
            'photo': player.photo,
            })

def getinfo(request):
    platform = request.GET.get('platform')
    if platform == "acapp":
        return getinfo_acapp(request)
    elif platform == "web":
        return getinfo_web(request)
