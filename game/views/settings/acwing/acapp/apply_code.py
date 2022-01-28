from django.http import JsonResponse
from urllib.parse import quote
from random import randint
from django.core.cache import cache

def get_random():
    res = ""
    for i in range(8):
        res += str(randint(0,9))
    return res;


def apply_code(request):
    appid = "730"
    redirect_uri = quote("https://app730.acapp.acwing.com.cn/settings/acwing/acapp/receive_code")
    scope = "userinfo"
    state = get_random()
    cache.set(state,True,7200)#自动生成暗号 2小时有效
    return JsonResponse({
            'result':"success",
            'appid':appid,
            'redirect_uri':redirect_uri,
            'scope':scope,
            'state':state,
        });
