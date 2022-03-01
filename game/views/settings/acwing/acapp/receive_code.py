from django.http import JsonResponse
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.model.player.player import Player
from django.contrib.auth import login
from random import randint

def receive_code(request):
    data = request.GET

    if "errorcode" in data:
        return JsonResponse({
                'result':"code filed",
            })

    code = data.get("code")
    state = data.get("state")

    if not cache.has_key(state):
        return JsonResponse({
                'result':"state not exists",
            })
    cache.delete(state)

    apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
    params={
        'appid':"1697",
        'secret':"81e4829cbe504f998ba63b45f745d05e",
        'code':code,
    }

    apply_access_token_res = requests.get(apply_access_token_url,params=params).json()

    access_token = apply_access_token_res['access_token']
    openid = apply_access_token_res['openid']
    
    player = Player.objects.filter(openid=openid)
    if player.exists():
        return JsonResponse({
                'result':'success',
                'username':player[0].user.username,
                'photo':player[0].photo,
            })

    apply_userinfo_url ="https://www.acwing.com/third_party/api/meta/identity/getinfo/"
    params={
        'access_token':access_token,
        'openid':openid,
    }

    apply_userinfo_res = requests.get(apply_userinfo_url,params=params).json()

    username = apply_userinfo_res['username']
    photo = apply_userinfo_res['photo']

    while User.objects.filter(username=username).exists():
        username += str(randint(0,9))

    user = User.objects.create(username=username)
    player = Player.objects.create(user=user,photo=photo,openid=openid)

    return JsonResponse({
            'result':"success",
            'username':player.user.username,
            'photo':player.photo,
        });
