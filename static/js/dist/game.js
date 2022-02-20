class ChooseCharacter{
    constructor(root)
    {
        this.root = root;

        this.$choose_character = $(`
    <div class = "ac_game_choose_character">
        <audio class="ac_game_choose_character_hutao" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/hutao.mp3" type="audio/mpeg"></audio>
        <audio class="ac_game_choose_character_shenli" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/shenli.mp3" type="audio/mpeg""></audio>
       <div class ="ac_game_choose_character_total">
            <div class ="ac_game_item">
                <div class="ac_game_character_left" >
                    <div class ="ac_game_character_title">
                        神里凌华
                    </div>
                    <div class ="ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/fireball.png">
                        <div>
                            火球术： 向指定方向发射火球，q按键施法 CD：2秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src ="https://app730.acapp.acwing.com.cn/static/image/playground/skill/flash.png">
                        <div>
                            闪现: 向指定方向进行一段位移， f按键施法 CD: 4秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/guangdun.jpeg">
                        <div>
                            光盾: 在自己附近生成光盾， 抵挡一切伤害 r按键施法 CD:8秒 有效时间: 3秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/greenarrow.png">
                        <div>
                            光箭：指定一个方向，发出具有穿透效果光箭 d按键施法 CD: 8秒
                        </div>
                    </div>
                </div>
            </div>
            <div class ="ac_game_item">
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
            <div class="ac_game_item">
                <div class="ac_game_character_right" >
                    <div class ="ac_game_character_title">
                        胡桃
                    </div>
                    <div class ="ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/fireball.png">
                        <div>
                            火球术： 向指定方向发射火球，q按键施法 CD：2秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src ="https://app730.acapp.acwing.com.cn/static/image/playground/skill/flash.png">
                        <div>
                            闪现: 向指定方向进行一段位移， f按键施法 CD: 4秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/all_fireball.png">
                        <div>
                            召唤术: 向四面八方发射 10 颗火球，r键施法 CD: 8秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/cureball.jpg">
                        <div>
                            天使之拥：指定一个位置产生一个光阵,给自己以及队友回复生命 d按键施法 CD: 8秒 有效时间: 3秒
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`);
        this.$choose_character_menu = this.$choose_character.find(".ac_game_choose_character_body")
        this.$choose_character_image_hutao = this.$choose_character.find(".ac_game_choose_character_hutao img");
        this.$choose_character_image_shenli = this.$choose_character.find(".ac_game_choose_character_shenli img");

        this.$character_right = this.$choose_character.find(".ac_game_character_right");
        this.$character_left = this.$choose_character.find(".ac_game_character_left");
        this.$character_right.hide();
        this.$character_left.hide();

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

    choose_character_show()
    {
        this.$choose_character_menu.show();
    }

    add_events()
    {
        let outer = this;
        this.$choose_character_image_hutao.mouseover(function()
        {
                outer.$choose_character_bgm_hutao.play();
                outer.$character_right.fadeIn();

        });
        this.$choose_character_image_hutao.mouseout(function(){
                outer.$character_right.fadeOut();
        })
        

        this.$choose_character_image_shenli.mouseover(function()
        {
               outer.$choose_character_bgm_shenli.play();
               outer.$character_left.fadeIn();
        });

        this.$choose_character_image_shenli.mouseout(function(){
               outer.$character_left.fadeOut();
        });
        this.$choose_character_image_hutao.click(function(){
            outer.hide();
            outer.root.playground.work = "hutao";
            outer.root.playground.show();
        });
        this.$choose_character_image_shenli.click(function(){
            outer.hide();
            outer.root.playground.work = "shenli";
            outer.root.playground.show();
        });
    }

    hide()
    {
        this.$choose_character_menu.hide();
        this.$choose_character.hide();
    }
    show()
    {
        this.$choose_character.show();
        this.choose_character_show();
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

    before_update()
    {
    }

    update()
    {

    }

    later_update()
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
            obj.before_update();
        }

    }
    for (let i = 0 ; i< Ac_Game_Objects.length;i++)
    {
        let obj = Ac_Game_Objects[i];
        obj.update();
    }

    for (let i = 0 ;i<Ac_Game_Objects.length;i++ )
    {
        let obj = Ac_Game_Objects[i];
        obj.later_update();
    }

    laststamp = timestamp;
    requestAnimationFrame(Ac_Game_Animation);
}

requestAnimationFrame(Ac_Game_Animation);



class ChatItem 
{
    constructor(playground)
    {
        this.playground =playground;

        this.$history = $(`<div class="ac_game_chatitem_history">历史记录</div>`);
        this.$input =$(`<input type ="text" class ="ac_game_chatitem_input">`);
        this.id = null;
        this.$history.hide();
        this.$input.hide();
        this.mode = 0;
        this.playground.$playground.append(this.$history);
        this.playground.$playground.append(this.$input);
        this.player_id = -1;

        this.start()
    }

    start()
    {
        this.add_events();
        this.resize();
    }

    add_events()
    {

        let outer= this;
        this.$input.keydown(function(e){
            if (e.which === 27)
            {
                outer.hide_input();
            }
            else if (e.which === 13)
            {
                let text = outer.$input.val();
                if (text && outer.player_id !== -1)
                {
                    console.log(outer.player_id);
                    outer.$input.val("");
                    let massage = outer.write_massage(text,outer.mode);
                    outer.render_massage(massage);
                    outer.playground.mps.send_chat(massage,outer.player_id,outer.mode);
                }
            }
            else if (e.which === 17)
            {
                outer.mode =(outer.mode + 1) % 2;
            }
        });


        this.$history.mousedown(function(e){
            let player = outer.playground.plays[0];
            if (player.character ==="me")
            {
                const rect = player.ctx.canvas.getBoundingClientRect();
                let tx = ( e.clientX - rect.left ) / outer.playground.scale + player.x - 0.5*outer.playground.width / outer.playground.scale;
                let ty = ( e.clientY - rect.top ) / outer.playground.scale + player.y - 0.5;

                if(e.which === 3 )
                {
                    player.move_to(tx,ty);
                    outer.playground.mps.send_move_to(tx,ty);
                }
            }
        });
    }

    resize()
    {
        this.width = this.playground.width * 0.2;
        this.history_height = this.playground.height * 0.3;

        this.margin_left = (this.playground.$playground.width() - this.playground.width) / 2 + this.playground.height * 0.02;
        this.history_top = (this.playground.$playground.height() - this.playground.height) / 2 + this.playground.height / 2;
        this.input_top = this.history_top + 0.02 * this.playground.height + this.history_height;
        this.$history.css({
            "position": "absolute",
            "width": this.width,
            "height": this.history_height,
            "left": this.margin_left,
            "top": this.history_top,

            "color": "white",
            "font-size":  "2vh",
            "overflow": "auto",
            "background-color": "rgba(0, 0, 0, 0.3)",
            "border-radius":"5px",
        });

        this.$input.css({
            "position": "absolute",
            "width": this.width,
            "height": "3vh",
            "left": this.margin_left,
            "top": this.input_top,

            "color": "white",
            "font-size":  "2vh",
            "background-color": "rgba(0, 0, 0, 0.3)",
        });

    }


    show_input()
    {
        this.$input.show();
        this.$input.focus();

        this.show_history();
    }

    hide_input()
    {
        this.$input.hide();
        this.playground.GameMap.$canvas.focus();
    }

    render_massage(text)
    {
        this.$history.append(text);
        this.$history.scrollTop(this.$history[0].scrollHeight);
        this.show_history();
    }

    write_massage(text,mode)
    {
        let username = this.playground.root.settings.username;
        let massage =null;
        if (mode === 0)
            massage = `[[基友]${username}]:${text}`;
        else if(mode === 1)
            massage = `[[全体]${username}]:${text}`;

        let div_massage = `<div>${massage}</div>`
        return div_massage;
    }

    show_history()
    {
        this.$history.fadeIn();

        if (this.id) clearTimeout(this.id);

        let outer = this;
        this.id = setTimeout(function(){
            outer.$history.fadeOut();
            outer.id = null;
        },3000);
    }

}
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

    before_update()
    {
        this.render();
    }

    render()
    {
        if (!this.playground.foucs) return false ;

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
    on_destory ()
    {
        for(let i =0 ;i < this.playground.GameMap.walls.length ;i ++)
        {
            let wall = this.playground.GameMap.walls[i];
            if(wall === this)
            {
                this.playground.GameMap.walls.splice(i,1);
            }
        }
    }
}
class GameMap extends AcGameObject{
    constructor(playground)
    {
        super();
        this.playground = playground;

        this.$canvas = $(`<canvas tabindex = 0></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.playground.$playground.append(this.$canvas);
        this.walls= [];
        this.start();
    }

    start()
    {
        this.$canvas.focus();
        this.create_walls();
    }

    create_walls()
    {
        let color = "rgba(255,255,255,0.5)";
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

    before_update()
    {
        this.resize();
        this.render();
    }

    render()
    {
        this.ctx.fillStyle = "rgba(176,223,229,1)";
        this.ctx.fillRect( 0, 0,this.ctx.canvas.width,this.ctx.canvas.height);
    }

    on_destory()
    {
        while(this.walls && this.walls.length > 0)
        {
            this.walls[0].destory();
        }
    }
}
class GameBoard extends AcGameObject
{
    constructor(playground,attackee_player_img,attacked_player_img,color)
    {
        super();
        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;
        this.attackee_player_img = attackee_player_img;
        this.attacked_player_img = attacked_player_img;
        this.coldtime = 3 ;
        this.esp = 0.01;
        this.color = color;
    }

    update()
    {
        this.coldtime -= this.timedate / 1000;
        if (this.coldtime < this.esp)
            this.destory();

        this.render();
    }

    render()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.playground.width*0.25,this.playground.height*0.2,this.playground.width*0.5,this.playground.height*0.1);

        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.25,this.playground.height*0.25,this.playground.height*0.05,Math.PI*0.5,Math.PI*1.5,false);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.75,this.playground.height*0.25,this.playground.height*0.05,Math.PI*0.5,Math.PI*1.5,true);
        this.ctx.fill();

        this.ctx.font = this.playground.height*0.05 +"px '微软雅黑'";
        this.ctx.fillStyle = "rgba(48,22,28,1)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("击      败",this.playground.width/2,this.playground.height * 0.25);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.3, this.playground.height*0.25, this.playground.height*0.05, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.attackee_player_img, this.playground.width*0.3 - this.playground.height*0.05, this.playground.height*0.25 - this.playground.height*0.05,this.playground.height*0.1,this.playground.height*0.1);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.7, this.playground.height*0.25, this.playground.height*0.05, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.attacked_player_img, this.playground.width*0.7 - this.playground.height*0.05, this.playground.height*0.25 - this.playground.height*0.05,this.playground.height*0.1,this.playground.height*0.1);
        this.ctx.restore();
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
        this.id = -1;
    }

    update()
    {
        this.render();
    }

    is_mode (player)
    {
        if (this.playground.mode === "duoren" && this.id != -1)
        {
            if (player.id % 2 === this.id)
                return true;
        }
        else
        {
            if (player.character === "me")
                return true;
        }
        return false;
    }

    render()
    {
        let x = this.playground.real_width / 8;

        let y = x;

        let scale = this.playground.scale;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(this.playground.width - x * scale,0,x * scale,y * scale);
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
                this.ctx.strokeRect(tx/ 8 + this.x, ty/ 8, this.playground.width  / 8, this.playground.height / 8);
            }
            if (this.is_mode(player))
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 ,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "green";
                this.ctx.fill();
            }
            else
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 ,this.radius * scale / 8,0,Math.PI * 2 , false);
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
        this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
        this.ctx.fillStyle="rgba(45,12,19,1)";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text,this.playground.width/2,this.playground.height*0.1);
    }
}
class Player extends AcGameObject
{
    constructor(playground,x,y,speed,radius,color,character,username,photo,id,work)
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
        this.photo = photo;
        this.username = username;
        this.id = id;
        this.fireballs=[];
        this.greenarrows=[];
        this.skill_r_time = 0;
        if (this.character !== "ai") {
            this.img = new Image();
            this.img.src = this.photo;
            this.work = work;
            this.skill_d = null;
            this.skill_d_coldtime=8;
            this.skill_r = null;
            this.skill_r_coldtime=8;
            this.fireball_coldtime = 2;
            this.flash_coldtime = 4;
            if(this.character === "me")
            {
                this.fireball_img = new Image();
                this.fireball_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/fireball.png";
                this.flash_img = new Image();
                this.flash_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/flash.png";
                if (this.work === "hutao")
                {
                    this.skill_r_img = new Image();
                    this.skill_r_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/all_fireball.png";
                    this.skill_d_img = new Image();
                    this.skill_d_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/cureball.jpg";
                }
                else if (this.work === "shenli")
                {
                    this.skill_r_img = new Image();
                    this.skill_r_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/guangdun.jpeg";
                    this.skill_d_img = new Image();
                    this.skill_d_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/greenarrow.png";
                }
            }
        }
        else
        {
            this.img=new Image();
            this.img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/renji.jpg";
        }


        this.f = 0.9;

    }
    
    search_id()
    {
        let cnt = [0,0,0,0,0,0];
        for (let i=0 ;i<this.playground.plays.length; i++)
        {
            let player = this.playground.plays[i];
            cnt[player.id]++;
        }

        for(let i = 0;i<6 ;i++)
        {
            if (!cnt[i])
            {
                this.playground.plays[0].id = i ;
                break;
            }
        }
    }

    start()
    {
        this.playground.player_cnt ++;
        this.playground.notice_board.write("已就绪 ："+this.playground.player_cnt +"人");

        if(this.playground.player_cnt >= 4)
        {
            this.playground.state = "fighting";
            this.playground.notice_board.write("Fighting");
            this.search_id();

            if (this.playground.mode === "duoren")
            {
                for (let i=0 ;i<this.playground.plays.length;i++)
                {
                    let player = this.playground.plays[i];
                    if (player.id % 2 === 0)
                    {
                        player.x = this.playground.width * 0.5 / this.playground.scale;
                        player.y = 0.5;
                    }
                    else
                    {
                        player.x = 3 - this.playground.width * 0.5 / this.playground.scale;
                        player.y = 2.5;
                    }
                }

                this.playground.min_map.id = this.playground.plays[0].id % 2;
                this.playground.chatitem.player_id = this.playground.plays[0].id % 2;
            }
        }

        if(this.character === "me")
        {
            this.add_listening_events();
        }
        else if (this.character === "ai")
        {
            let tx = Math.random() * this.playground.real_width;
            let ty = Math.random() * this.playground.real_height;

            this.move_to(tx,ty);;
        }
    }

    add_listening_events()
    {
        let outer = this;

        this.playground.GameMap.$canvas.keydown(function(e){

            if (outer.playground.mode === "duoren")
            {
                if (e.which === 13)
                {
                    outer.playground.chatitem.show_input();
                    return false;
                }
                else if (e.which === 27)
                {
                    outer.playground.chatitem.hide_input();
                    return false;
                }
            }
            
            if(outer.playground.state !== "fighting")
                return true;
            if(e.which === 81 && outer.fireball_coldtime < outer.esp)
                outer.cur_skill = "fireball";
            else if(e.which === 82 && outer.skill_r_coldtime < outer.esp)
            {
                outer.skill_r_coldtime = 8;
                if (outer.work === "hutao")
                {
                    outer.all_shoot_fireball();
                }
                else if (outer.work === "shenli")
                {
                    outer.skill_r_time = 3;
                    if (outer.playground.mode === "duoren")
                    {
                        let tx = 0;
                        let ty = 0;
                        let uuid = 0;
                        outer.playground.mps.send_fireball(tx,ty,uuid,"guangdun");
                    }
                }
            }
            else if(e.which === 70 && outer.flash_coldtime < outer.esp)
                outer.cur_skill = "flash";
            else if(e.which === 68 && outer.skill_d_coldtime < outer.esp)
                outer.skill_d = "ready";

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
                    let fireball = outer.shoot_fireball(tx,ty,0.8,"rgba(250,93,25,0.8)");
                    outer.cur_skill =null;
                    outer.fireball_coldtime = 2;

                    if (outer.playground.mode === "duoren")
                    {
                        outer.playground.mps.send_fireball(tx,ty,fireball.uuid,"fireball");
                    }

                }
                else if(outer.cur_skill === "flash")
                {
                    outer.flash_angle = Math.atan2(ty - outer.y ,tx - outer.x);
                    outer.is_flash = true;
                    outer.flash_coldtime = 4;
                }
                else if (outer.skill_d === "ready")
                {
                    outer.skill_d_coldtime = 8;
                    if (outer.work === "shenli")
                    {
                        let greenarrow = outer.shoot_greenarrow(tx,ty);
                        outer.skill_d =null;

                        if (outer.playground.mode === "duoren")
                        {
                            outer.playground.mps.send_fireball(tx,ty,greenarrow.uuid,"greenarrow");
                        }
                    }
                    else if(outer.work === "hutao")
                    {
                        let cureball = outer.shoot_cureball(tx,ty);
                        outer.skill_d =null;

                        if (outer.playground.mode === "duoren")
                        {
                            outer.playground.mps.send_fireball(tx,ty,cureball.uuid,"cureball");
                        }
                    }
                }
            }
        });
    }

    attacked(angle , damage,attackee,events)
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

            if (this.playground.mode === "danren")
            {
                if (attackee.character === "me")
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(27,167,132,0.7)");
                }
                else
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(191,53,83,0.7)");
                }
            }
            else if (this.playground.mode === "duoren")
            {
                if (this.playground.min_map.id === attackee.id % 2)
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(27,167,132,0.7)");
                }
                else
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(191,53,83,0.7)");
                }

            }

            this.destory();
            return false;
        }
        if(events === "fireball")
        {
            this.speed *= this.f;
            this.damage_speed = damage * 80;

            this.damage_vx = Math.cos(angle);
            this.damage_vy = Math.sin(angle);
        }
    }

    cureball_attacked(damage)
    {
        for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
        {
            let angle = Math.random()*Math.PI*2;
            let radius = Math.random() * 0.005;
            let move_length = Math.random() * 0.1 ;
            let speed = 0.15;
            let x = this.x + Math.cos(angle) * move_length;
            let y = this.y + Math.sin(angle) * move_length;

            new FireWorks(this.playground,this,x,y,this.color,radius,angle,move_length,speed);
        }
        if (this.radius < 0.05)
        {
            this.radius += damage;
            this.speed *=1.1;
        }

    }

    receive_attacked(attackee,ball_uuid,angle,damage,x,y,events)
    {
        if(events === "fireball")
            attackee.fireball_destory(ball_uuid);
        if(events === "greenarrow" && this.skill_r_time > this.esp)
            attackee.greenarrow_destory(ball_uuid);

        this.x = x;
        this.y = y;
        if (events !== "cureball")
        {
            if(this.skill_r_time < this.esp)
                this.attacked(angle,damage,attackee,events);
        }
        else if (events === "cureball")
        {
            this.cureball_attacked(damage);
        }
    }

    shoot_greenarrow(tx,ty)
    {
        let color = "rgb(254,215,26,0.7)";
        let angle = Math.atan2(ty-this.y,tx-this.x);
        let speed = 1.5;
        let move_length = 1;
        return new GreenArrow(this.playground,this,this.x,this.y,speed,move_length,angle,color);
    }

    shoot_fireball( tx , ty,speed,color)
    {
        let angle = Math.atan2(ty-this.y,tx-this.x);
        let move_length = 0.8;
        let radius =  0.01;
        return new FireBall(this.playground,this,this.x,this.y,speed,angle,move_length,radius);
    }

    shoot_cureball(tx , ty)
    {
        return new CureBall(this.playground,this,tx,ty);
    }

    all_shoot_fireball()
    {
        for(let i = 0 ; i < 10; i++)
        {
            let angle = (Math.PI * 2)/10*i;

            let tx = this.x + Math.cos(angle);
            let ty = this.y + Math.sin(angle);

            let speed = 0.8;
            let color = "rgba(250,93,25,0.8)";
            let fireball =this.shoot_fireball(tx,ty,speed,color);
            if (this.playground.mode === "duoren")
            {
                this.playground.mps.send_fireball(tx,ty,fireball.uuid,"fireball");
            }
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

    update_time()
    {
        if(this.skill_r_time > this.esp)
            this.skill_r_time -= this.timedate/1000;
        else
            this.skill_r_time = 0;

        if (this.fireball_coldtime > this.esp)
            this.fireball_coldtime -= this.timedate/1000;
        else
            this.fireball_coldtime =0;

        if (this.flash_coldtime > this.esp)
            this.flash_coldtime -= this.timedate/1000;
        else
            this.flash_coldtime =0;

        if (this.skill_d_coldtime > this.esp)
            this.skill_d_coldtime -= this.timedate/1000;
        else
            this.skill_d_coldtime =0;

        if(this.skill_r_coldtime > this.esp)
            this.skill_r_coldtime -= this.timedate/1000;
        else
            this.skill_r_coldtime = 0;
    }

    update_win()
    {
        if (this.playground.state === "fighting" && this.playground.mode === "danren" && this.playground.plays.length === 1 && this.character === "me")
        {
            this.playground.scoreboard.win();
            this.playground.state = "over";
            this.playground.foucus = null;
        }
    }

    update()
    {
        this.update_win();
        this.update_time();
        this.spend_time += this.timedate / 1000;

        if(this.character === "ai" && this.spend_time > 4 )
        {
            if(Math.random() < 1 / 100.0)
            {
                let player = this.playground.plays[Math.floor(Math.random() * this.playground.plays.length)];
                let speed =  0.8;

                let distance = this.get_distance(this.x,this.y,player.x,player.y);

                let v = speed * this.timedate /1000;
                let time = distance / v;

                let tx = player.x + time * player.speed * player.timedate /1000 * player.vx;
                let ty = player.y + time * player.speed * player.timedate /1000 * player.vy;
                if(this !== player)
                    this.shoot_fireball(tx,ty,0.8,"rgba(250,93,25,0.8)")
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
        if(this.character === "me")
            this.render_skill();
        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;

        let scale = this.playground.scale;


        if (this.skill_r_time >this.esp)
        {
            this.ctx.beginPath();
            this.ctx.arc(x*scale,y*scale,this.playground.height * 0.2,this.radius * scale,0,Math.PI * 2,false);
            this.ctx.fillStyle =  "rgba(254,215,26,0.7)";
            this.ctx.fill();
        }

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
    render_skill()
    {
        let skill_radius = 0.05 * this.playground.height;

        let scale = this.playground.height ;
        let  d = scale *0.02;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(0.5* this.playground.width - this.playground.height * 0.15,this.playground.height * 0.86,this.playground.height *0.5,this.playground.height *0.14);

        //fireball 
        let x = this.playground.width*0.5 - this.playground.height*0.08;
        let y = this.playground.height * 0.93;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.fireball_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y );
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.fireball_coldtime / 2 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill();

        if (!this.fireball_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Q",x,y+d);
        }

        //flash
        x += scale * 0.12;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.flash_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y );
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.flash_coldtime / 4 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill();

        if (!this.flash_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("F",x,y+d);
        }

        //skill_r
        x += scale * 0.12;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.skill_r_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y );
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.skill_r_coldtime / 8 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill();

        if (!this.skill_r_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("R",x,y+d);
        }
        //skill_d
        x += scale * 0.12;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.skill_d_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.skill_d_coldtime / 8 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill(); 
        if (!this.skill_d_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("D",x,y+d);
        }
    }

    on_destory()
    {
        if (this.character === "me")
        {
            if (this.playground.mode === "danren" && this.playground.state === "fighting")
            {
                this.playground.scoreboard.lose();
                this.playground.foucs = null;
            }
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
                fireball.destory();
                break;
            }
        }
    }
    greenarrow_destory(uuid)
    {
        for (let i=0 ; i<this.greenarrows.length ;i++ )
        {
            let greenarrow = this.greenarrows[i];
            if (greenarrow.uuid === uuid)
            {
                greenarrow.destory();
                break;
            }
        }
    }



}

class ScoreBoard extends AcGameObject
{
    constructor(playground)
    {
        super();

        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;

        this.state = null ;

        this.win_img = new Image();
        this.win_img.src = "https://cdn.acwing.com/media/article/image/2021/12/17/1_8f58341a5e-win.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://cdn.acwing.com/media/article/image/2021/12/17/1_9254b5f95e-lose.png";

    }

    start()
    {
    }

    add_listening_events(){
        let outer = this;

        if (this.playground.GameMap)
        {
            let $canvas = this.playground.GameMap.$canvas;
            $canvas.on('click',function(){
                outer.playground.hide();
                outer.playground.root.menu.show();
            });
        }
    }

    win(){
        this.state = "win";
        let outer = this;
        setTimeout(function(){
            outer.add_listening_events();
        },1000);
    }

    lose()
    {
        this.state = "lose";
        let outer = this;
        setTimeout(function(){
            outer.add_listening_events();
        },1000);
    }

    later_update()
    {
        this.render();
    }

    render()
    {
        let len = this.playground.height / 2;
        if (this.state === "win"){
            this.ctx.drawImage(this.win_img , this.playground.width /2 -len /2,this.playground.height / 2 -len / 2, len , len)
        }
        else if(this.state === "lose")
        {
            this.ctx.drawImage(this.lose_img , this.playground.width /2 -len /2,this.playground.height / 2 -len / 2, len , len)
        }
    }
}
class CureBall extends AcGameObject
{
    constructor (playground,player,x,y)
    {
        super();

        this.playground = playground;
        this.ctx =this.playground.GameMap.ctx;
        this.player =player;
        this.x = x;
        this.y = y;
        this.time = 3;
        this.radius = 0.2;
        this.color = "rgba(150,194,78,0.5)";
        this.esp =0.01;
        this.damage = 0.01;
    }

    is_mode(player)
    {
        if (this.playground.mode === "danren")
        {
            if (this.player === player)
                return true;
        }
        else if (this.playground.mode === "duoren")
        {
            if (this.player.id % 2 === player.id % 2)
                return true;
        }
        return false;
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x2-x1;
        let dy = y2-y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_attack(tx ,ty , tr)
    {
        let distance = this.get_distance(tx,ty,this.x,this.y);

        if(distance < this.radius - tr)
            return true;
        return false;
    }

    attack(player,attackee_player)
    {
        let angle = Math.atan2(player.y-this.y,player.x-this.x);
        player.cureball_attacked(this.damage);

        if (this.playground.mode ==="duoren")
        {
            this.playground.mps.send_attack(player.uuid,this.uuid,this.damage,angle,player.x,player.y,"cureball");
        }
    }
    update_attack()
    {
        for (let i=0;i<this.playground.plays.length ;i++)
        {
            let player = this.playground.plays[i];
            if (this.is_mode(player) && this.is_attack(player.x,player.y,player.radius))
            {
                this.attack(player,this.player);
            }
        }
    }
    update()
    {
        this.time -= this.timedate /1000;
        if (this.time < this.esp)
            this.destory();

        if (this.player.character !== "enemy")
            this.update_attack();
        this.render();
    }

    render ()
    {
        if (!this.playground.foucs) return false ;

        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(x * scale ,y * scale, this.radius * scale , 0, Math.PI * 2 ,false);
        this.ctx.fill();
    }
}
class FireBall extends AcGameObject
{
    constructor(playground,player, x ,y , speed, angle,move_length,radius,color)
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
        this.color = color;

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

    is_mode(player)
    {
        if (this.playground.mode === "duoren")
        {
            if (player.id % 2 !== this.player.id % 2)
                return true;
        }
        else if (this.playground.mode === "danren")
        {
            if (player !== this.player)
                return true;
        }
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
        if(player.character === "ai" && distance < player.radius * 2 && 0)
        {

            player.cur_skill = "flash";
            player.is_flash = true;
            player.flash_angle = this.angle + Math.PI / 2;
        }

        if (player.skill_r_time > this.esp && distance < 0.2 + this.radius)
            return true;

        if(distance < tr +this.radius)
            return true;
        return false;
    }

    attack(player,attackee_player)
    {
        let angle = Math.atan2(player.y-this.y,player.x-this.x);
        
        if(player.skill_r_time < this.esp)
            player.attacked(angle,this.damage,attackee_player,"fireball");

        if (this.playground.mode ==="duoren")
        {
            this.playground.mps.send_attack(player.uuid,this.uuid,this.damage,angle,player.x,player.y,"fireball");

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
            if( this.is_mode(player) && this.is_attack(player,player.x , player.y , player.radius))
            {
                this.attack(player,this.player);
            }
        }

    }
    update()
    {
        for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
        {
            let angle = Math.random()*Math.PI*2;
            let radius = Math.random() * 0.005;
            let move_length = Math.random() * 0.05 ;
            let speed = 0.15;

            new FireWorks(this.playground,this,this.x,this.y,this.color,radius,angle,move_length,speed);

        }
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
        if (!this.playground.foucs) return false ;

        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(x * scale,y * scale ,this.radius * scale,0,Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
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
class GreenArrow extends AcGameObject
{
    constructor(playground,player,x,y,speed,move_length,angle,color)
    {
        super();
        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;
        this.start_x = x;
        this.start_y = y;

        this.now_x = this.start_x;
        this.now_y = this.start_y;
        this.angle=angle;

        this.move_length = move_length;
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
        this.color = color;
        this.speed = speed;
        this.damage =0.01;
        this.player = player;
        this.player.greenarrows.push(this);

        this.plan_player =[];
        this.esp = 0.01;
    }

    is_mode(player)
    {
        if (this.playground.mode === "duoren")
        {
            if (player.id % 2 !== this.player.id % 2)
            {
                return true;
            }
        }
        else if (this.playground.mode === "danren")
        {
            if (player !== this.player)
            {
                return true;
            }
        }
        return false;
    }

    start()
    {
        for (let i = 0 ;i < this.playground.plays.length;i++)
        {
            this.plan_player.push("0");
        }
    }
    out_of_map(x , y)
    {
        if (x < this.esp*0.1 || x > this.playground.real_width - this.esp*0.1)
            return true;

        if (y < this.esp*0.1 || y > this.playground.real_height - this.esp*0.1)
            return true;
        return false;
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x2-x1;
        let dy = y2-y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_attack(player,tx ,ty,tr)
    {
        let distance = this.get_distance(tx,ty,this.now_x,this.now_y);
        //if(player.character === "ai" && distance < player.radius * 2 )
       // {

         //   player.cur_skill = "flash";
            //player.is_flash = true;
           // player.flash_angle = this.angle + Math.PI / 2;
        //}
        
        if (player.skill_r_time > this.esp && distance < 0.2)
            return true;
        if(distance < tr )
            return true;
        return false;
    }

    attack(player,attackee_player)
    {
        let angle = Math.atan2(player.y-this.now_y,player.x-this.now_x);

        if (player.skill_r_time < this.esp)
            player.attacked(angle,this.damage,attackee_player,"greenarrow");

        if (this.playground.mode ==="duoren")
        {
            this.playground.mps.send_attack(player.uuid,this.uuid,this.damage,angle,player.x,player.y,"greenarrow");

        }

        if (player.skill_r_time > this.esp)
            this.destory();
    }

    update_attack()
    {
        for(let i = 0 ; i < this.playground.plays.length ; i++)
        {
            let player = this.playground.plays[i];
            
            if(this.is_mode(player) && this.is_attack(player,player.x , player.y , player.radius) && this.plan_player[i] === "0")
            {
                this.attack(player,this.player);
                this.plan_player[i] = "1";
            }
        }

    }
    update()
    {
        if (this.out_of_map(this.now_x,this.now_y))
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

    update_move()
    {
        if(this.move_length < this.esp)
        {
            this.destory();
            return false;
        }
        else 
        {
            let moved = Math.min(this.move_length,this.speed * this.timedate /1000);

            this.now_x += this.vx * moved;
            this.now_y += this.vy * moved;

            this.move_length -= moved;
        }
    }
    render()
    {
        if (!this.playground.foucs) return false ;

        let start_x = this.start_x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let start_y = this.start_y - this.playground.plays[0].y + 0.5 ;

        let now_x = this.now_x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let now_y = this.now_y - this.playground.plays[0].y + 0.5 ;
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.playground.height * 0.01;
        this.ctx.moveTo(start_x * scale,start_y * scale);
        this.ctx.lineTo(now_x * scale,now_y * scale);

        this.ctx.stroke();
        this.ctx.closePath();
    }
    on_destory()
    {
        for (let i =0 ;i<this.player.greenarrows.length;i++)
        {
            let greenarrow =this.player.greenarrows[i];
            if(greenarrow === this)
            {
                this.player.greenarrows.splice(i, 1);
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
                outer.receive_create_player(uuid,data.username,data.photo,data.id,data.work);
            }
            else if (event === "move_to")
            {
                outer.receive_move_to(uuid,data.tx,data.ty);
            }
            else if (event === "fireball")
            {
                outer.receive_fireball(uuid,data.tx,data.ty,data.ball_uuid,data.events);
            }
            else if (event === "attack")
            {
                outer.receive_attack(uuid,data.attacked_uuid,data.ball_uuid,data.damage,data.angle,data.x,data.y,data.events);
            }
            else if (event === "flash")
            {
                outer.receive_flash(uuid,data.angle);
            }
            else if (event === "chat")
            {
                outer.receive_chat(data.massage,data.id,data.mode);
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
    send_create_player(username,photo,work){

        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"create_player",
            'uuid':outer.uuid,
            'username':username,
            'photo':photo,
            'work':work,
        }));
    }

    receive_create_player(uuid,username,photo,id,work)
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
            work
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
    send_fireball(tx,ty,ball_uuid,events)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':'fireball',
            'uuid':outer.uuid,
            'tx':tx,
            'ty':ty,
            'ball_uuid':ball_uuid,
            'events':events,
        }));
    }
    receive_fireball(uuid,tx,ty,ball_uuid,events)
    {
        let player = this.search_player(uuid);
        if (player)
        {
            if(events === "fireball")
            {
                let fireball = player.shoot_fireball(tx,ty,0.8,"rgba(250,93,25,0.8)");
                fireball.uuid = ball_uuid;
            }
            else if (events === "greenarrow")
            {
                let greenarrow = player.shoot_greenarrow(tx,ty);
                greenarrow.uuid = ball_uuid;
            }
            else if (events === "guangdun")
            {
                player.skill_r_time = 3;
            }
            else if (events === "cureball")
            {
                let cureball = player.shoot_cureball(tx,ty);
                cureball.uuid = ball_uuid;
            }
        }
    }
    send_attack(attacked_uuid,ball_uuid,damage,angle,x,y,events)
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
            'events':events,
        }));
    }

    receive_attack(attackee_uuid,attacked_uuid,ball_uuid,damage,angle,x,y,events)
    {
        let attackee = this.search_player(attackee_uuid);
        let attacked = this.search_player(attacked_uuid);

        if (attackee && attacked) attacked.receive_attacked(attackee,ball_uuid,angle,damage,x,y,events);
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
    send_chat(massage,id,mode)
    {
        let outer =this;
        this.ws.send(JSON.stringify({
            'event':"chat",
            'uuid':outer.uuid,
            'massage':massage,
            'id':id,
            'mode':mode,
        }));

    }
    receive_chat(massage,id,mode)
    {
        if(mode === 1)
            this.playground.chatitem.render_massage(massage);

        if(mode === 0 && id=== this.playground.chatitem.player_id)
            this.playground.chatitem.render_massage(massage);
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

    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i ++ ) {
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;
    }


    start()
    {
        let outer = this;
        let id = this.create_uuid();
        $(window).on(`resize.${id}`,function(){
            outer.resize();
            if (outer.chatitem)
                outer.chatitem.resize();
        });

        if(this.root.acwingos)
        {
            this.root.acwingos.api.window.on_close(function(){
                outer.hide();
                $(window).off(`resize.${id}`);
            });
        }

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
        this.plays.push(new Player(this,this.real_width/2,this.real_height/2,0.15,0.05,"white","me",outer.root.settings.username,outer.root.settings.photo,null,this.work));
        this.foucs = this.plays[0];
        this.min_map = new MinMap(this,this.GameMap.ctx);
        this.scoreboard = new ScoreBoard(this);
        if(this.mode === "danren")
        {
            for(let i = 0 ; i < 5 ;i++)
                this.plays.push(new Player(this,this.real_width/2,this.real_height/2,0.15,0.05,this.get_random_color(),"ai",null,null,i));
        }
        else if (this.mode === "duoren")
        {
            this.chatitem = new ChatItem(this);
            this.mps = new MultiplayerSocket(this);
            this.mps.uuid = this.plays[0].uuid;

            this.mps.ws.onopen = function()
            {
                outer.mps.send_create_player(outer.root.settings.username,outer.root.settings.photo,outer.work);
            };

        }
        this.$playground.show();
    }

    hide()
    {
        this.is_doing = false;

        while (this.plays && this.plays.length > 0)
        {
            this.plays[0].destory();
            this.foucs = null ;
        }

        if (this.GameMap)
        {
            this.GameMap.destory();
            this.GameMap = null;
        }

        if (this.notice_board)
        {
            this.notice_board.destory();
            this.notice_board = null;
        }

        if(this.scoreboard)
        {
            this.scoreboard.destory();
            this.scoreboard = null;
        }

        if (this.min_map)
        {
            this.min_map.destory();
            this.min_map = null;
        }

        this.$playground.hide();
        this.$playground.empty();
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
