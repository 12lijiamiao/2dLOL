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
            outer.root.playground.show("danren");
       });
       this.$shuang.click(function(){
            outer.hide();
            outer.root.playground.show("duoren");
       });
       this.$settings.click(function(){
           if(outer.root.settings.platform === "web")
           {
               outer.root.settings.remote_logout();
           }
           else
           {
               outer.root.acwingos.api.window.close();
           }
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

        this.uuid = this.random_uuid();
        this.is_start = false;
        this.timedate = 0;

    }

    random_uuid()
    {
        let res="";
        for(let i = 0 ; i<8; i++)
        {
            res += parseInt(Math.floor(Math.random()*10));
        }

        return res;
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
    constructor(playground,player,x,y, color , radius, angle , move_length, speed)
    {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.playground = playground;

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
        this.ctx.arc(this.x * this.playground.scale,this.y * this.playground.scale,this.radius * this.playground.scale,0,Math.PI * 2 ,false);
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
        this.playground.$playground.append(this.$canvas);
        console.log(this.playground.height);
    }

    resize()
    {
        this.ctx.canvas.height= this.playground.height;
        this.ctx.canvas.width = this.playground.width;
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }

    update()
    {
        this.resize();
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
    constructor(playground,x,y,speed,radius,color,character,username,photo,id)
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
        this.character = character;
        this.move_length=0;
        this.esp = 0.01;
        this.cur_skill = null;
        this.flash_angle = 0;
        this.is_flash = false;
        this.spend_time=0;
        this.live = true;
        this.photo = photo;
        this.username = username;
        this.id = id;
        this.fireballs=[];

        if (this.character !== "ai") {
            this.img = new Image();
            this.img.src = this.photo;
        }


        this.f = 0.9;

    }

    start()
    {
        if(this.character === "me")
            this.add_listening_events();
        else if (this.character === "ai")
        {
            let tx = Math.random() * this.playground.width / this.playground.scale;
            let ty = Math.random() ;

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

            let tx = ( e.clientX - rect.left ) / outer.playground.scale;
            let ty = ( e.clientY - rect.top ) / outer.playground.scale;
            if(!outer.live)
                return false;
            if(e.which === 3 )
            {
                outer.move_to(tx,ty);
                if (outer.playground.mode === "duoren")
                {
                    outer.playground.mps.send_move_to(tx,ty);
                }
            }
            else if (e.which === 1)
            {
                if(outer.cur_skill === "fireball")
                {
                    let fireball = outer.shoot_fireball(tx,ty);
                    outer.cur_skill =null;

                    if (outer.playground.mode === "duoren")
                    {
                        outer.playground.mps.send_fireball(tx,ty,fireball.uuid);
                    }

                }
                else if(outer.cur_skill === "flash")
                {
                    outer.flash_angle = Math.atan2((e.clientY - outer.y - rect.top)/this.playground.scale ,(e.clientX - outer.x - rect.left)/this.playground.scale);
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
            let radius = Math.random() * 0.005;
            let move_length = Math.random() * 0.15 ;
            let speed = 0.15;

            new FireWorks(this.playground,this,this.x,this.y,this.color,radius,angle,move_length,speed);

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

    receive_attacked(attackee,ball_uuid,angle,damage,x,y)
    {
        attackee.fireball_destory(ball_uuid);
        console.log(ball_uuid);

        this.x = x;
        this.y = y;
        this.attacked(angle,damage);
    }

    shoot_fireball( tx , ty)
    {
        let angle = Math.atan2(ty-this.y,tx-this.x);
        let speed = 0.5;
        let move_length = 0.8;
        let radius =  0.01;
        return new FireBall(this.playground,this,this.x,this.y,speed,angle,move_length,radius);
    }

    all_shoot_fireball()
    {
        for(let i = 0 ; i < 10; i++)
        {
            let angle = (Math.PI * 2)/10*i;
            let speed = 0.5;
            let move_length = 0.8;
            let radius = 0.01;
            new FireBall(this.playground,this,this.x,this.y,speed,angle,move_length,radius);
        }
    }

    flash(angle)
    {
        let distance = 0.1;
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

        if(this.character === "ai" && this.spend_time > 4 )
        {
            if(Math.random() < 1 / 100.0)
            {
                let player = this.playground.plays[Math.floor(Math.random() * this.playground.plays.length)];
                let speed =  0.5;

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
        if(this.damage_speed > this.esp)
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
                    if(this.character === "ai")
                    {

                        let tx = Math.random() * this.playground.width / this.playground.scale;
                        let ty = Math.random() ;

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
        let scale = this.playground.scale;
        if (this.character !== "ai") {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, (this.x - this.radius) * scale, (this.y - this.radius) * scale, this.radius * 2 * scale, this.radius * 2 * scale); 
            this.ctx.restore();
        }else{
            this.ctx.beginPath();
            this.ctx.arc(this.x * scale,this.y * scale,this.radius * scale,0,Math.PI * 2 , false);
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
    fireball_destory(uuid)
    {
        for (let i=0 ; i<this.fireballs.length ;i++ )
        {
            let fireball = this.fireballs[i];
            if (fireball.uuid === uuid)
            {
                console.log("yes");
                fireball.destory();
                break;
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
        this.eqs = 0.01;
        this.radius = radius;
        this.damage = 0.01;
        this.player.fireballs.push(this);

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
        if(player.character === "ai" && distance < player.radius * 2 )
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

        if (this.playground.mode ==="duoren")
        {
              this.playground.mps.send_attack(player.uuid,this.uuid,this.damage,angle,player.x,player.y);
      
        }
        this.destory();
    }

    update_move()
    {
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
    }

    update_attack()
    {
        for(let i = 0 ; i < this.playground.plays.length ; i++)
        {
            let player = this.playground.plays[i];
            if(player !== this.player && this.is_attack(player,player.x , player.y , player.radius))
            {
                this.attack(player);
            }
        }
      
    }
    update()
    {
        if (this.player.character !== "enemy")
        {
            this.update_attack();
        }
        this.update_move();
        this.render();
    }

    render()
    {
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x * scale,this.y * scale ,this.radius * scale,0,Math.PI * 2, false);
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
    }

    on_destory()
    {
        for (let i =0 ;i<this.player.fireballs.length;i++)
        {
            let fireball =this.player.fireballs[i];
            if(fireball === this)
            {
                this.player.fireballs.splice(i, 1);
                break;
            }
        }
    }
}
class MultiplayerSocket{
    constructor(playground)
    {
        this.playground = playground;
        this.ws = new WebSocket("wss://app730.acapp.acwing.com.cn/wss/multiplayer/");

        this.start();
    }

    start ()
    {
        this.receive();
    }

    receive()
    {
        let outer = this;

        this.ws.onmessage = function(e) //e 就是接受的参数  send的那些东西
        {
            let data = JSON.parse(e.data);

            let uuid = data.uuid;
            if (uuid === outer.uuid) return false;

            let event = data.event;
            if(event=== "create_player"){
                outer.receive_create_player(uuid,data.username,data.photo,data.id);
            }
            else if (event === "move_to")
            {
                outer.receive_move_to(uuid,data.tx,data.ty);
            }
            else if (event === "fireball")
            {
                outer.receive_fireball(uuid,data.tx,data.ty,data.ball_uuid);
            }
            else if (event === "attack")
            {
                outer.receive_attack(uuid,data.attacked_uuid,data.ball_uuid,data.damage,data.angle,data.x,data.y)
            }
        }
    }

    search_player(uuid)
    {

        for(let i=0 ;i < this.playground.plays.length;i++)
        {
            let player = this.playground.plays[i];
            if(player.uuid === uuid)
                return player;
        }
        return null;
    }
    send_create_player(username,photo){

        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"create_player",
            'uuid':outer.uuid,
            'username':username,
            'photo':photo,
        }));
    }

    receive_create_player(uuid,username,photo,id)
    {
        let player = new Player(
            this.playground,
            this.playground.width/2/this.playground.scale,
            0.5,
            0.15,
            0.05,
            "white",
            "enemy",
            username,
            photo,
            id,
        )

        player.uuid = uuid;
        this.playground.plays.push(player);
    }
    send_move_to(tx,ty)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"move_to",
            'uuid':outer.uuid,
            'tx':tx,
            'ty':ty,
        }));
    }

    receive_move_to(uuid,tx,ty)
    {
        let player = this.search_player(uuid);

        if(player) player.move_to(tx,ty);
    }
    send_fireball(tx,ty,ball_uuid)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':'fireball',
            'uuid':outer.uuid,
            'tx':tx,
            'ty':ty,
            'ball_uuid':ball_uuid,
        }));
    }
    receive_fireball(uuid,tx,ty,ball_uuid)
    {
        let player = this.search_player(uuid);

        if (player)
        {
            let fireball = player.shoot_fireball(tx,ty);
            fireball.uuid = ball_uuid;
        }
    }
    send_attack(attacked_uuid,ball_uuid,damage,angle,x,y)
    {

        let outer = this;
        
        this.ws.send(JSON.stringify({
            'event':"attack",
            'uuid':outer.uuid,
            'attacked_uuid':attacked_uuid,
            'ball_uuid':ball_uuid,
            'damage':damage,
            'angle':angle,
            'x':x,
            'y':y,
        }));
    }

    receive_attack(attackee_uuid,attacked_uuid,ball_uuid,damage,angle,x,y)
    {
        
        let attackee = this.search_player(attackee_uuid);
        let attacked = this.search_player(attacked_uuid);
        
        if (attackee && attacked) attacked.receive_attacked(attackee,ball_uuid,angle,damage,x,y);
    }
}
class AcgamePlayground{
    constructor(root)
    {
        this.root = root;
        this.$playground = $(`<div class = "ac_game_playground" ></div>`);
        this.hide();
        
        this.start();
    }

    start()
    {
        let outer = this;
        $(window).resize(function(){
            outer.resize();
        });
    }

    get_random_color()
    {
        let colors = ["green","pink","red","blue","yellow","gray" ,"purple" ,"gold"];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    resize()
    {
        this.width=this.$playground.width();
        this.height= this.$playground.height();
        let unit = Math.min(this.height / 9,this.width / 16);
        this.height = unit*9;
        this.width = unit*16;
        this.scale=this.height;
    }

    show(mode)
    {
        this.mode = mode;
        let outer = this;
        this.root.$ac_game.append(this.$playground);
        this.resize();
        this.plays = [];
        this.GameMap = new GameMap(this);
        this.plays.push(new Player(this,this.width/2/this.scale,0.5,0.15,0.05,"white","me",outer.root.settings.username,outer.root.settings.photo));
        if(mode === "danren")
        {    
            for(let i = 0 ; i < 5 ;i++)
                this.plays.push(new Player(this,this.width/2/this.scale,0.5,0.15,0.05,this.get_random_color(),"ai"));
        }
        else if (mode === "duoren")
        {
            this.mps = new MultiplayerSocket(this);
            this.mps.uuid = this.plays[0].uuid;

            this.mps.ws.onopen = function()
            {
                outer.mps.send_create_player(outer.root.settings.username,outer.root.settings.photo);
            };

        }
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

        this.$acwing_login = this.$settings.find(".ac_game_settings_acwing img");

        this.root.$ac_game.append(this.$settings);


        this.start();
    }

    start()
    {
        if (this.platform === "web")
        {
            this.web_getinfo();
            this.add_listening_events();
        }
        else if (this.platform === "acapp")
        {
            this.acapp_getinfo();
        }
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


    web_getinfo()
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

    acwing_login(appid,redirect_uri,scope,state)
    {
        let outer =this;
        this.root.acwingos.api.oauth2.authorize(appid, redirect_uri, scope, state, function(resp){
            console.log(resp);
            if (resp.result === "success")
            {
                outer.username=resp.username;
                outer.photo=resp.photo;
                outer.hide();
                outer.root.menu.show();
            }
        });
    }

    acapp_getinfo()
    {
        let outer = this;

        $.ajax({
            url:"https://app730.acapp.acwing.com.cn/settings/acwing/acapp/apply_code",
            type:"GET",
            success:function(resp)
            {
                if(resp.result === "success")
                {
                    outer.acwing_login(resp.appid,resp.redirect_uri,resp.scope,resp.state);

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
