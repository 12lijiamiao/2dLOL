class AcgameMenu{
   constructor(root)
   {
      this.root = root ;
      this.$menu =$(`
<div class ="ac_game_menu">
   <div class = "ac_game_menu_field">
        <div class = "ac_game_menu_item ac_game_menu_item_dan">
        单人模式
        </div>
        <br>
        <div class = "ac_game_menu_item ac_game_menu_item_shuang">
        多人对战
        </div>
        <br>
        <div class = "ac_game_menu_item ac_game_menu_item_settings">
        设置
        </div>
   </div>
</div>
`);

       this.$menu.hide();
       this.root.$ac_game.append(this.$menu);
       
       this.$dan = this.$menu.find(".ac_game_menu_item_dan");
       this.$shuang = this.$menu.find(".ac_game_menu_item_shuang");
       this.$settings = this.$menu.find(".ac_game_menu_item_settings");

       this.start()
   }
   start()
   {
       this.click_events();
   }
   click_events()
   {
       let outer = this;
       this.$dan.click(function(){
            outer.hide();
            outer.root.playground.show();
       });
       this.$shuang.click(function(){
            console.log("click shuang ren");
       });
       this.$settings.click(function(){
            console.log("click settings")
            outer.root.settings.remote_logout();
       });
   }
   show(){//menu界面
        this.$menu.show();
   }
   hide(){
        this.$menu.hide();
   }



}


let Ac_Game_Objects = [];

class AcGameObject {
    constructor()
    {
        Ac_Game_Objects.push(this);

        this.is_start = false;
        this.timedate = 0;

    }

    start()
    {

    }

    update()
    {

    }

    on_destory()
    {

    }

    destory()
    {
        this.on_destory()

        for(let i =0 ; i< Ac_Game_Objects.length ; i++)
        {
            if(Ac_Game_Objects[i] === this)
            {
                Ac_Game_Objects.splice(i,1);
                break;
            }
        }
    }
}

let laststamp;

let Ac_Game_Animation = function(timestamp){
    for(let i=0 ; i< Ac_Game_Objects.length ; i++)
    {
        let obj = Ac_Game_Objects[i];
        if(!obj.is_start)
        {
            obj.start();
            obj.is_start = true;
        }
        else
        {
            obj.timedate = timestamp - laststamp ;
            obj.update();
        }

    }
    laststamp = timestamp;
    requestAnimationFrame(Ac_Game_Animation);
}

requestAnimationFrame(Ac_Game_Animation);
class FireWorks extends AcGameObject {
    constructor(player,x,y, color , radius, angle , move_length, speed)
    {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
        this.move_length = move_length;
        this.speed = speed;

        this.color = color;
        this.ctx = player.ctx;

        this.eqs = 0.1;
    }

    update()
    {
        if(this.move_length < this.eqs)
        {
            this.destory();
        }
        else
        {
            let moved = Math.min(this.move_length, this.speed * this.timedate /1000);

            this.x += moved * this.vx;
            this.y += moved * this.vy;

            this.move_length -= moved;
        }
        this.render();
    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2 ,false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
class GameMap extends AcGameObject{
    constructor(playground)
    {
        super();
        this.playground = playground;

        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.height= this.playground.height;
        this.ctx.canvas.width = this.playground.width;
        this.playground.$playground.append(this.$canvas);
    }

    update()
    {
        this.render();
    }

    render()
    {
        this.ctx.fillStyle = "rgba(0 ,0 ,0 , 0.2)";
        this.ctx.fillRect( 0, 0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}
class Player extends AcGameObject
{
    constructor(playground,x,y,speed,radius,color,is_me)
    {
        super();
        this.playground = playground;
        this.color = color;
        this.x= x;
        this.y= y;
        this.ctx = this.playground.GameMap.ctx;
        this.radius= radius;
        this.vx = 0;
        this.vy = 0;
        this.damage_vx=0;
        this.damage_vy=0;
        this.damage_speed=0
        this.speed = speed;
        this.is_me= is_me;
        this.move_length=0;
        this.esp = 0.1;
        this.cur_skill = null;
        this.flash_angle = 0;
        this.is_flash = false;
        this.spend_time=0;
        this.live = true;

        if (this.is_me) {
            this.img = new Image();
            this.img.src = this.playground.root.settings.photo;
        }


        this.f = 0.9;

    }

    start()
    {
        if(this.is_me)
            this.add_listening_events();
        else
        {
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;

            this.move_to(tx,ty);
        }
    }

    add_listening_events()
    {
        let outer = this;

        $(window).keydown(function(e){
            if(!outer.live)
                return false;
            if(e.which === 81)
                outer.cur_skill = "fireball";
            else if(e.which === 82)
                outer.all_shoot_fireball();
            else if(e.which === 70)
                outer.cur_skill = "flash";

        });

        this.playground.GameMap.$canvas.on("contextmenu",function(){
            return false;
        });

        this.playground.GameMap.$canvas.mousedown(function(e){
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if(!outer.live)
                return false;
            if(e.which === 3 )
                outer.move_to(e.clientX - rect.left,e.clientY - rect.top);
            else if (e.which === 1)
            {
                if(outer.cur_skill === "fireball")
                {
                    outer.shoot_fireball(e.clientX - rect.left,e.clientY - rect.top);
                    outer.cur_skill =null;
                }
                else if(outer.cur_skill === "flash")
                {
                    outer.flash_angle = Math.atan2(e.clientY - outer.y - rect.top ,e.clientX - outer.x - rect.left);
                    outer.is_flash = true;
                }
            }
        });
    }

    attacked(angle , damage)
    {
        for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
        {
            let angle = Math.random()*Math.PI*2;
            let radius = Math.random() * this.playground.height * 0.005;
            let move_length = Math.random() * this.playground.height * 0.15 ;
            let speed = this.playground.height*0.15;

            new FireWorks(this,this.x,this.y,this.color,radius,angle,move_length,speed);

        }

        this.radius -= damage;
        if(this.radius < this.esp)
        {
            this.destory();
            this.live = false;
            return false;
        }

        this.speed *= this.f;
        this.damage_speed = damage * 80;

        this.damage_vx = Math.cos(angle);
        this.damage_vy = Math.sin(angle);
    }

    shoot_fireball( tx , ty)
    {
        let angle = Math.atan2(ty-this.y,tx-this.x);
        let speed = this.playground.height*0.5;
        let move_length = this.playground.height*0.8;
        let radius = this.playground.height* 0.01;
        new FireBall(this.playground,this,this.x,this.y,speed,angle,move_length,radius);
    }

    all_shoot_fireball()
    {
        for(let i = 0 ; i < 10; i++)
        {
            let angle = (Math.PI * 2)/10*i;
            let speed = this.playground.height*0.5;
            let move_length = this.playground.height*0.8;
            let radius = this.playground.height* 0.01;
            new FireBall(this.playground,this,this.x,this.y,speed,angle,move_length,radius);
        }
    }

    flash(angle)
    {
        let distance = this.playground.height * 0.1;
        this.x += distance * Math.cos(angle);
        this.y += distance * Math.sin(angle);
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x1 - x2;
        let dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to( tx, ty)
    {
        this.move_length = this.get_distance(tx,ty,this.x,this.y);

        let angle = Math.atan2(ty-this.y,tx-this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    update()
    {
        this.spend_time += this.timedate / 1000;

        if(!this.is_me && this.spend_time > 4 )
        {
            if(Math.random() < 1 / 100.0)
            {
                let player = this.playground.plays[Math.floor(Math.random() * this.playground.plays.length)];
                let speed = this.playground.height* 0.5;

                let distance = this.get_distance(this.x,this.y,player.x,player.y);

                let v = speed * this.timedate /1000;
                let time = distance / v;

                let tx = player.x + time * player.speed * player.timedate /1000 * player.vx;
                let ty = player.y + time * player.speed * player.timedate /1000 * player.vy;
                if(this !== player)
                    this.shoot_fireball(tx,ty);
            }
            else if (Math.random() > 0.999)
            {
                if(this.playground.plays.length > 1)
                {
                    this.all_shoot_fireball();
                }
            }


        }
        if(this.damage_speed > 5)
        {
            this.vx = 0 ;
            this.vy = 0 ;
            this.move_length=0;

            let moved = this.damage_speed * this.timedate /1000;

            this.x += moved * this.damage_vx;
            this.y += moved * this.damage_vy;

            this.damage_speed *= this.f;
        }
        else{
            if(this.cur_skill === "flash" && this.is_flash)
            {
                this.vx = this.vy =0;
                this.move_length = 0;
                this.cur_skill = null;
                this.is_flash = false;
                this.flash(this.flash_angle);
            }
            else
            {
                if(this.move_length < this.esp)
                {
                    this.vx = this.vy = 0
                    this.move_length = 0;
                    if(!this.is_me)
                    {
                        let tx = Math.random() * this.playground.width;
                        let ty = Math.random() * this.playground.height;

                        this.move_to(tx,ty);
                    }
                }
                else
                {
                    let moved = Math.min(this.move_length,this.speed * this.timedate /1000);

                    this.x += this.vx * moved;
                    this.y += this.vy * moved;

                    this.move_length -= moved;

                }
            }
        }
        this.render();

    }

    render()
    {
        if (this.is_me) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2); 
            this.ctx.restore();
        }else{
            this.ctx.beginPath();
            this.ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2 , false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    on_destory()
    {
        for(let i =0 ;i < this.playground.plays.length ;i ++)
        {
            let player = this.playground.plays[i];
            if(this === player)
            {
                this.playground.plays.splice(i,1);
            }
        }
    }
}

class FireBall extends AcGameObject
{
    constructor(playground,player, x ,y , speed, angle,move_length,radius)
    {
        super();
        this.angle = angle;
        this.x=x;
        this.y=y;
        this.player=player;
        this.playground = playground;
        this.speed=speed;
        this.ctx = this.player.ctx;
        this.move_length=move_length;
        this.eqs = 0.1;
        this.radius = radius;
        this.damage = this.playground.height * 0.01;

        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x2-x1;
        let dy = y2-y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_attack(player,tx ,ty , tr)
    {
        let distance = this.get_distance(tx,ty,this.x,this.y);
        if(!player.is_me && distance < player.radius * 2 )
        {
            player.cur_skill = "flash";
            player.is_flash = true;
            player.flash_angle = this.angle + Math.PI / 2;
        }
        if(distance < tr +this.radius)
            return true;
        return false;
    }

    attack(player)
    {
        let angle = Math.atan2(player.y-this.y,player.x-this.x);

        player.attacked(angle,this.damage);
        this.destory();
    }

    update()
    {
        for(let i = 0 ; i < this.playground.plays.length ; i++)
        {
            let player = this.playground.plays[i];
            if(player !== this.player && this.is_attack(player,player.x , player.y , player.radius))
            {
                this.attack(player);
            }
        }
        if(this.move_length < this.eqs )
        {
            this.destory();
            return false;
        }
        else
        {
            let moved = Math.min(this.move_length,this.speed * this.timedate /1000);

            this.x += this.vx * moved;
            this.y += this.vy * moved;

            this.move_length -= moved;
        }
        this.render();
    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
    }
}
class AcgamePlayground{
    constructor(root)
    {
        this.root = root;
        this.$playground = $(`<div class = "ac_game_playground" ></div>`);
        this.hide();
    }

    get_random_color()
    {
        let colors = ["green","pink","red","blue","yellow","gray" ,"purple" ,"gold"];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    show()
    {
        this.root.$ac_game.append(this.$playground);
        this.height = this.$playground.height();
        this.width = this.$playground.width();
        this.plays = [];
        this.GameMap = new GameMap(this);
        this.plays.push(new Player(this,this.width/2,this.height/2,this.height*0.15,this.height*0.05,"white",true));
        for(let i = 0 ; i < 5 ;i++)
            this.plays.push(new Player(this,this.width/2,this.height/2,this.height*0.15,this.height*0.05,this.get_random_color(),false));
        this.$playground.show();
    }

    hide()
    {
        this.is_doing = false;
        this.$playground.hide();
    }

}
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
        this.add_listening_events_login();
        this.add_listening_events_register();
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
export class AcGame{
    constructor(id,acwingos)
    {
        this.id = id;

        this.$ac_game = $('#' + id);
        this.acwingos = acwingos;
        this.settings = new AcgameSettings(this);

        this.menu = new AcgameMenu(this);

        this.playground= new AcgamePlayground(this);
    }
}
