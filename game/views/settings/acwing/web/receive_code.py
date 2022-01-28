from django.shortcuts import redirect
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.model.player.player import Player
from django.contrib.auth import login
from random import randint

def receive_code(request):
    data = request.GET
    code = data.get("code")
    state = data.get("state")

    if not cache.has_key(state):
        return redirect("index")
    cache.delete(state)

    apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
    params={
        'appid':"730",
        'secret':"70c3f8c5952b462b9116d339808b425d",
        'code':code,
    }

    apply_access_token_res = requests.get(apply_access_token_url,params=params).json()

    access_token = apply_access_token_res['access_token']
    openid = apply_access_token_res['openid']
    
    player = Player.objects.filter(openid=openid)
    if player.exists():
        login(request,player[0].user)
        return redirect("index")

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

    login(request,user)


    return redirect("index")
