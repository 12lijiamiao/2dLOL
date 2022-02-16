class ChooseCharacter{
    constructor(root)
    {
        this.root = root;

        this.$choose_character = $(`
    <div class = "ac_game_choose_character">
        <audio class="ac_game_choose_character_hutao" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/hutao.mp3" type="audio/mpeg"></audio>
        <audio class="ac_game_choose_character_shenli" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/shenli.mp3" type="audio/mpeg""></audio>
        <div class ="ac_game_choose_character_body">
            <div class = "ac_game_choose_character_item">
                角色选择
            </div>
            <div class = "ac_game_choose_character_image">
                <div class = "ac_game_choose_character_image_item ac_game_choose_character_shenli">
                    <img width = "70" src="https://app730.acapp.acwing.com.cn/static/image/choose_character/shenli.jpg">
                </div>
                &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                <div class = "ac_game_choose_character_image_item ac_game_choose_character_hutao">
                    <img width = "70" src="https://app730.acapp.acwing.com.cn/static/image/choose_character/hutao.png">
                </div>
            </div>
        </div>
    </div>
`)
        this.$choose_character_image_hutao = this.$choose_character.find(".ac_game_choose_character_hutao img");
        this.$choose_character_image_shenli = this.$choose_character.find(".ac_game_choose_character_shenli img");

        this.hide();

        this.root.$ac_game.append(this.$choose_character);

        this.$choose_character_bgm_hutao = document.getElementsByClassName('ac_game_choose_character_hutao')[0];
        this.$choose_character_bgm_shenli = document.getElementsByClassName('ac_game_choose_character_shenli')[0];
        this.start();
    }
    start()
    {
        this.add_events()
    }

    add_events()
    {
        let outer = this;
        console.log(this.$choose_character_bgm_hutao);
        this.$choose_character_image_hutao.mouseover(function()
        {
                outer.$choose_character_bgm_hutao.play();
        });
        
        this.$choose_character_image_shenli.mouseover(function()
        {
               outer.$choose_character_bgm_shenli.play();
        });
        this.$choose_character_image_hutao.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$choose_character_image_shenli.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
    }

    hide()
    {
        this.$choose_character.hide();
    }
    show()
    {
        this.$choose_character.show();
    }
}
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
            outer.root.playground.mode = "danren";
            outer.root.choose_character.show();
       });
       this.$shuang.click(function(){
            outer.hide();
            outer.root.playground.mode = "duoren";
            outer.root.choose_character.show();
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

        this.eqs = 0.01;
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

        if (!this.playground.foucs) return false ;
        

        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;
        this.ctx.beginPath();
        this.ctx.arc(x * this.playground.scale,y * this.playground.scale,this.radius * this.playground.scale,0,Math.PI * 2 ,false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
class Wall extends AcGameObject{
    constructor(playground,ctx,x,y,color)
    {
        super();
        this.playground = playground;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color=color;
    }

    update()
    {
        this.render();
    }

    render()
    {
        if (!this.playground.foucs) return;

        let unit = this.playground.real_width / 20 ;
        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;

        let scale = this.playground.scale;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.playground.height * 0.005;
        this.ctx.strokeStyle = this.color;
        this.ctx.rect(x * scale, y * scale, unit * scale, unit * scale);
        this.ctx.stroke();
        this.ctx.restore();

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
        this.walls= [];
        this.start();
    }

    start()
    {
        this.create_walls();
    }

    create_walls()
    {
        let color = "white";
        let unit = this.playground.real_width / 20;
        for( let i = 0 ;i < 20; i++)
        {
            for (let j =0; j< 20 ;j++)
            {
                this.x = i * unit;
                this.y = j * unit;
                this.walls.push(new Wall(this.playground,this.ctx,this.x,this.y,color));
            }
        }
    }

    resize()
    {
        this.ctx.canvas.height= this.playground.height;
        this.ctx.canvas.width = this.playground.width;
    }

    update()
    {
        this.resize();
        this.render();
    }

    render()
    {
        this.ctx.fillStyle = "rgba(176,223,229,1)";
        this.ctx.fillRect( 0, 0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}
class MinMap extends AcGameObject
{
    constructor(playground,ctx)
    {
        super();
        this.playground = playground;
        this.ctx = ctx;
        this.radius = 0.1;
    }

    update()
    {
        this.render();
    }

    render()
    {
        let x = this.playground.real_width / 8;

        let y = x;

        let scale = this.playground.scale;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(this.playground.width - x * scale,this.playground.height - y * scale,x * scale,y * scale);
        this.x = this.playground.width - this.playground.real_width / 8 * this.playground.scale;
        this.y = this.playground.height - this.playground.real_height / 8 * this.playground.scale;
   

        for (let i =0 ;i < this.playground.plays.length ; i++)
        {
            let player = this.playground.plays[i];


            let x= player.x;
            let y= player.y;
            if (player.character === "me")
            {
                this.ctx.lineWidth = this.playground.height * 0.005;
                this.ctx.strokeStyle = "rgba(115,87,92,1)";
                let tx = x * scale - 0.5 * this.playground.width;
                let ty = y * scale - 0.5 * this.playground.height;
                if (tx < 0)
                {
                    tx = 0;
                }
                if (ty <0)
                {
                    ty = 0;
                }
                if (tx + this.playground.width > this.playground.real_width * this.playground.scale)
                {
                    tx = this.playground.real_width * scale - this.playground.width;
                }
                if (ty + this.playground.height > this.playground.real_height * scale)
                {
                    ty = this.playground.real_height * scale - this.playground.height;
                }
                this.ctx.strokeRect(tx/ 8 + this.x, ty/ 8 + this.y, this.playground.width  / 8, this.playground.height / 8);

                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 + this.y,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "green";
                this.ctx.fill();
            }
            else
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 + this.y,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "red";
                this.ctx.fill();
            }
        }



    }

}
class NoticeBoard extends AcGameObject {
    constructor (playground)
    {
        super();
        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;
        this.text = "已就绪 ： 0 人";
    }

    write(text){
        this.text = text;
    }
    update()
    {
        this.render();
    }
    render()
    {
        this.ctx.font = "20px serif";
        this.ctx.fillStyle="white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text,this.playground.width/2,20);
    }
}
class Player extends AcGameObject
{
    constructor(playground,x,y,speed,radius,color,character,username,photo,id)
    {
        super();
        playground.player_cnt ++;
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
        this.playground.notice_board.write("已就绪 ："+this.playground.player_cnt +"人");

        if(this.playground.player_cnt >= 3)
        {
            this.playground.state = "fighting";
            this.playground.notice_board.write("Fighting");
        }

        if(this.character === "me")
        {
            this.add_listening_events();
        }
        else if (this.character === "ai")
        {
            let tx = Math.random() * this.playground.real_width;
            let ty = Math.random() * this.playground.real_height;

            this.move_to(tx,ty);
        }
    }

    add_listening_events()
    {
        let outer = this;

        $(window).keydown(function(e){
            if(outer.playground.state !== "fighting")
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

            let tx = ( e.clientX - rect.left ) / outer.playground.scale + outer.x - 0.5*outer.playground.width / outer.playground.scale;
            let ty = ( e.clientY - rect.top ) / outer.playground.scale + outer.y - 0.5;
           // if (outer.playground.state === "over" && e.which === 3)
            //{
   
              //  outer.playground.root.menu.show();
              //  outer.playground.hide();
           // }

            if(outer.playground.state !== "fighting")
                return true;

            if (tx < 0 || ty < 0 || tx > outer.playground.real_width || ty > outer.playground.real_height )
                return true;

            for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
            {
                let angle = Math.random()* Math.PI * 2;
                let radius = 0.005;
                let move_length =  0.05 ;
                let speed = 0.15;
                new FireWorks(outer.playground,outer,tx,ty,"rgba(0,0,0,0.7)",radius,angle,move_length,speed);

            }

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
                    outer.flash_angle = Math.atan2(ty - outer.y ,tx - outer.x);
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
            let radius = Math.random() * 0.01;
            let move_length = Math.random() * 0.15 ;
            let speed = 0.15;

            new FireWorks(this.playground,this,this.x,this.y,this.color,radius,angle,move_length,speed);

        }

        this.radius -= damage;
        if(this.radius < this.esp)
        {
            this.destory();
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
        let distance = 0.2;
        this.x += distance * Math.cos(angle);
        this.y += distance * Math.sin(angle);
        this.vx = this.vy =this.move_length = 0;

        if (this.out_of_map(this.x,this.y))
        {
            this.damage_speed = 0.005 * 80;

            this.damage_vx = -1 * Math.cos(angle);
            this.damage_vy = -1 * Math.sin(angle);
        }

        if (this.x - this.radius < this.esp * 0.1)
        {
            this.x = this.radius + this.esp * 0.101;
        }

        if (this.y - this.radius< this.esp * 0.1)
        {
            this.y = this.radius + this.esp * 0.101;
        }

        if (this.x + this.radius > this.playground.real_width - this.esp * 0.1)
        {
            this.x = this.playground.real_width - this.radius - this.esp * 0.101;
        }

        if (this.y + this.radius> this.playground.real_height - this.esp * 0.1)
        {
            this.y = this.playground.real_height - this.radius - this.esp * 0.101;
        }
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

    out_of_map(x , y)
    {
        if (x - this.radius < this.esp*0.1 || x + this.radius > this.playground.real_width - this.esp*0.1)
            return true;

        if (y - this.radius < this.esp*0.1 || y + this.radius > this.playground.real_height - this.esp*0.1)
            return true;
        return false;
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

        if (this.out_of_map(this.x,this.y))
        {
            if (this.x < this.esp * 0.1)
            {
                this.x = this.radius;
            }

            if (this.y < this.esp * 0.1)
            {
                this.y = this.radius;
            }

            if (this.x > this.playground.real_width - this.esp * 0.1)
            {
                this.x = this.playground.real_width - this.radius;
            }

            if (this.y > this.playground.real_height - this.esp * 0.1)
            {
                this.y = this.playground.real_height - this.radius;
            } 
            if (this.damage_speed >this.esp)
            {
                this.damage_speed = 0.01 * 80;

                this.damage_vx = -1 * this.damage_vx;
                this.damage_vy = -1 * this.damage_vy;
            }
            else if(this.move_length >this.esp)
            {
                this.damage_speed = 0.005 * 80 ;
                this.damage_vx = -1 * this.vx;
                this.damage_vy = -1 * this.vy;
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
                this.cur_skill = null;
                this.is_flash = false;
                this.flash(this.flash_angle);

                if (this.playground.mode === "duoren" && this.character === "me")
                {
                    this.playground.mps.send_flash(this.flash_angle);
                }
            }
            else
            {
                if(this.move_length < this.esp)
                {
                    this.vx = this.vy = 0
                    this.move_length = 0;
                    if(this.character === "ai")
                    {

                        let tx = Math.random() * this.playground.real_width;
                        let ty = Math.random() * this.playground.real_width;

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
        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;

        let scale = this.playground.scale;


        if (this.character !== "ai") {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(x * scale, y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, (x - this.radius) * scale, (y - this.radius) * scale, this.radius * 2 * scale, this.radius * 2 * scale);
            this.ctx.restore();
        }else{
            this.ctx.beginPath();
            this.ctx.arc(x * scale,y * scale,this.radius * scale,0,Math.PI * 2 , false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    on_destory()
    {
        if (this.character === "me")
        {    
            this.playground.state = "over";
            this.playground.notice_board.write("You are over");

        }


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
        this.esp = 0.01;
        this.radius = radius;
        this.damage = 0.01;
        this.player.fireballs.push(this);

        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    out_of_map(x , y)
    {
        if (x - this.radius < this.esp*0.1 || x + this.radius > this.playground.real_width - this.esp*0.1)
            return true;

        if (y - this.radius < this.esp*0.1 || y + this.radius > this.playground.real_height - this.esp*0.1)
            return true;
        return false;
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
        if(this.move_length < this.esp )
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
        if (this.out_of_map(this.x,this.y))
        {
            this.destory();
            return false;
        }

        if (this.player.character !== "enemy")
        {
            this.update_attack();
        }
        this.update_move();
        this.render();
    }

    render()
    {
        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(x * scale,y * scale ,this.radius * scale,0,Math.PI * 2, false);
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
            else if (event === "flash")
            {
                outer.receive_flash(uuid,data.angle);
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
            this.playground.real_width/2,
            this.playground.real_height/2,
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

    send_flash(angle)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"flash",
            'uuid':outer.uuid,
            'angle':angle,
        }));
    }

    receive_flash(uuid,angle)
    {
        let player = this.search_player(uuid);
        
        if (player)  player.flash(angle);
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


        this.real_width = this.real_height = 3;

    }

    show()
    {
        let outer = this;
        this.root.$ac_game.append(this.$playground);
        this.resize();
        this.player_cnt = 0;
        this.foucs = null;
        this.state = "waiting";
        this.plays = [];
        this.GameMap = new GameMap(this);
        this.notice_board = new NoticeBoard(this);
        this.plays.push(new Player(this,this.real_width/2,this.real_height/2,0.15,0.05,"white","me",outer.root.settings.username,outer.root.settings.photo));
        this.foucs = this.plays[0];
        this.min_map = new MinMap(this,this.GameMap.ctx);
        if(this.mode === "danren")
        {
            for(let i = 0 ; i < 5 ;i++)
                this.plays.push(new Player(this,this.real_width/2,this.real_height/2,0.15,0.05,this.get_random_color(),"ai",null,null,i));
        }
        else if (this.mode === "duoren")
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

       // Ac_Game_Objects.splice(0,Ac_Game_Objects.length);//无法返回界面

       // console.log("关闭"+Ac_Game_Objects.length);
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
        this.choose_character = new ChooseCharacter(this);
        this.playground= new AcgamePlayground(this);
        this.menu = new AcgameMenu(this);

        this.$menu_bgm_item=$(`
<audio class="ac-game-menu-bgm" src="https://app730.acapp.acwing.com.cn/static/audio/menu/menu.mp3" preload="auto" autoplay="autoplay" loop="loop"></audio>
`)
        this.$menu_bgm= document.getElementsByClassName('ac-game-menu-bgm')[0];
        this.$ac_game.append(this.$menu_bgm_item);
        this.$menu_bgm_item.show();
    }



}
