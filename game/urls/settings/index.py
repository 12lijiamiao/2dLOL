from django.urls import path,include
from game.views.settings.getinfo import getinfo
from game.views.settings.login import signin
from game.views.settings.register import register
from game.views.settings.logout import signout

urlpatterns =[
    path("getinfo/",getinfo,name="settings_getinfo"),
    path("login/",signin,name="login"),
    path("register/",register,name="register"),
    path("logout/",signout,name="logout"),
    path("acwing/",include("game.urls.settings.acwing.index")),
]
