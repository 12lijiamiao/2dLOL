class AcgameSettings{
    constructor(root)
    {
        this.root = root ;
        this.photo = "";
        this.platform = "web";
        if (this.root.acwingos) this.platform ="acapp";

        this.$settings = $(`
<div class = "ac_game_settings">
    <div class ="ac_game_settings_login">
        <div class = "ac_game_settings_title">
            登录
        </div>
        <div class="ac_game_settings_username">
            <div class="ac_game_settings_item">
                <input type ="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac_game_settings_password">
            <div class="ac_game_settings_item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac_game_settings_submit">
            <div class="ac_game_settings_item">
                <button>登录</button>
            </div>
        </div>
        <div class ="ac_game_settings_error_message">
        </div>
        <div class="ac_game_settings_option">
            注册
        </div>
        <br>
        <div class = "ac_game_settings_acwing">
            <img width = "30" src="https://app730.acapp.acwing.com.cn/static/image/playground/playground.png">
            <br>
            <br>
            <div>
                Acwing 一键登录
            </div>
        </div>
     </div>
     <div class ="ac_game_settings_register">
        <div class = "ac_game_settings_title">
            注册
        </div>
        <div class="ac_game_settings_username">
            <div class="ac_game_settings_item">
                <input type ="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac_game_settings_password ac_game_settings_password_first">
            <div class="ac_game_settings_item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac_game_settings_password ac_game_settings_password_second">
            <div class="ac_game_settings_item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="ac_game_settings_submit">
            <div class="ac_game_settings_item">
                <button>立即注册</button>
            </div>
        </div>
        <div class ="ac_game_settings_error_message">
        </div>
        <div class="ac_game_settings_option">
            登录
        </div>
        <br>
        <div class = "ac_game_settings_acwing">
            <img width = "30" src="https://app730.acapp.acwing.com.cn/static/image/playground/playground.png">
            <br>
            <br>
            <div>
                Acwing 一键登录
            </div>
        </div>
    </div>

</div>

`);
        this.$login = this.$settings.find(".ac_game_settings_login");
        this.$login_username = this.$login.find(".ac_game_settings_username input");
        this.$login_password = this.$login.find(".ac_game_settings_password input");
        this.$login_error_message = this.$login.find(".ac_game_settings_error_message");
        this.$login_option = this.$login.find(".ac_game_settings_submit button");
        this.$login_register = this.$login.find(".ac_game_settings_option");
        
        this.$login.hide();
        
        this.$register = this.$settings.find(".ac_game_settings_register");
        this.$register_username = this.$register.find(".ac_game_settings_username input");
        this.$register_password_first = this.$register.find(".ac_game_settings_password_first input");
        this.$register_password_second = this.$register.find(".ac_game_settings_password_second input");
        this.$register_error_message = this.$register.find(".ac_game_settings_error_message");
        this.$register_submit = this.$register.find(".ac_game_settings_submit button");
        this.$register_login = this.$register.find(".ac_game_settings_option");

        this.$register.hide();

        this.$acwing_login = this.$settings.find(".ac_game_settings_acwing img");

        this.root.$ac_game.append(this.$settings);


        this.start();
    }

    start()
    {
        this.getinfo();
        this.add_listening_events();
    }
    
    add_listening_events()
    {
        let outer= this;
        this.add_listening_events_login();
        this.add_listening_events_register();
        this.$acwing_login.click(function()
        {
            outer.web_acwing_login();
        });
    }

    add_listening_events_login()
    {
        let outer=this;
        this.$login_register.click(function()
            {
                outer.register();
            });
       this.$login_option.click(function()
           {
               outer.remote_login();
           });
    }
    add_listening_events_register()
    {
        let outer=this;
        this.$register_login.click(function(){
            outer.login();
        });
        this.$register_submit.click(function(){
            outer.remote_register();
        });

    }
    web_acwing_login()
    {
        $.ajax({
            url:"https://app730.acapp.acwing.com.cn/settings/acwing/web/apply_code/",
            type:"GET",
            success:function(resp){
                if(resp.result === "success")
                {
                    window.location.replace(resp.redirect_acwing_url);
                }
            }
        });
    }
    remote_login()
    {
        let outer=this;
        $.ajax({
            url:"https://app730.acapp.acwing.com.cn/settings/login/",
            type:"GET",
            data:{
                username:outer.$login_username.val(),
                password:outer.$login_password.val(),
            },
            success: function(resp){
                console.log(resp);
                if(resp.result ==="success")
                {
                    location.reload();
                }
                else{
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }
    remote_register()
    {
        let outer=this;
        $.ajax({
            url:"https://app730.acapp.acwing.com.cn/settings/register/",
            type:"GET",
            data:{
                username:outer.$register_username.val(),
                password_first:outer.$register_password_first.val(),
                password_second:outer.$register_password_second.val(),
            },
            success:function(resp){
                console.log(resp);
                if(resp.result === "success")
                {
                    location.reload();
                }
                else
                {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }
    remote_logout()
    {
        let outer = this;
        $.ajax({
            url:"https://app730.acapp.acwing.com.cn/settings/logout/",
            type:"GET",
            success:function(resp){
                if(resp.result === "success")
                    location.reload();
            }

        });
    }
    register()
    {
        this.$login.hide();
        this.$register.show();
    }

    login(){
        this.$register.hide();
        this.$login.show();
    }


    getinfo()
    {
        let outer = this;
        $.ajax({
            url :"https://app730.acapp.acwing.com.cn/settings/getinfo/",
            type:"GET",
            data:{
                platform:outer.platform,
            },
            success : function(resp)
            {
                console.log(resp);
                if(resp.result === "success"){
                    outer.username=resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                }else{
                    outer.login();
                }

            }
        });
    }
    hide()
    {
        this.$settings.hide();
    }
}
