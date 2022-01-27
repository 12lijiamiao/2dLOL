from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.model.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username","").strip()
    password_first = data.get("password_first","").strip()
    password_second = data.get("password_second","").strip()

    if not username or not password_first or not password_second:
        return JsonResponse({
                'result':"用户名或者密码不能为空"
            })
    if password_first != password_second:
        return JsonResponse({
                'result':"两个密码不一致",
            })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
                'result':"用户名已存在",
            })
    user = User(username=username)
    user.set_password(password_first)
    user.save()
    Player.objects.create(user=user, photo="https://img2.baidu.com/it/u=2161949891,656888789&fm=26&fmt=auto")
    login(request,user)
    return JsonResponse({
            'result':"success",
        })
