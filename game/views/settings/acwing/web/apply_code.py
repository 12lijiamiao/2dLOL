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
    appid = "1697"
    redirect_uri = quote("https://www.lijiamiao.top/settings/acwing/web/receive_code")
    scope = "userinfo"
    state = get_random()
    cache.set(state,True,7200)#自动生成暗号 2小时有效
    return JsonResponse({
            'result':"success",
            'redirect_acwing_url':"https://www.acwing.com/third_party/api/oauth2/web/authorize/" + "?appid=%s&redirect_uri=%s&scope=%s&state=%s" % (appid,redirect_uri,scope,state)
        });
