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
        <div class = "ac_game_menu_item ac_game_menu_item_shuang">
        多人对战
        </div>
        <div class = "ac_game_menu_item ac_game_menu_item_settings">
        设置
        </div>
   </div>
</div>
`);
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
        this.spend_time=0;

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
            if(e.which === 81)
                outer.cur_skill = "fireball";
                return false;
        });

        this.playground.GameMap.$canvas.on("contextmenu",function(){
            return false;
        });

        this.playground.GameMap.$canvas.mousedown(function(e){
            if(e.which === 3 )
                outer.move_to(e.clientX,e.clientY);
            else if (e.which === 1)
            {
                if(outer.cur_skill === "fireball")
                {
                    outer.shoot_fireball(e.clientX,e.clientY);
                    outer.cur_skill =null;
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

        if(!this.is_me && this.spend_time > 4 && Math.random() < 1 / 150.0)
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
        this.render();

    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2 , false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
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

    is_attack(tx ,ty , tr)
    {
        let distance = this.get_distance(tx,ty,this.x,this.y);
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
            if(player !== this.player && this.is_attack(player.x , player.y , player.radius))
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

        this.root.$ac_game.append(this.$playground);
        this.height = this.$playground.height();
        this.width = this.$playground.width();
    }

    get_random_color()
    {
        let colors = ["green","pink","red","blue","yellow","gray" ,"purple" ,"gold"];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    show()
    {
        this.GameMap = new GameMap(this);
        this.plays=[];
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
export class AcGame{
    constructor(id)
    {
        this.id = id;

        this.$ac_game = $('#' + id);
        this.menu = new AcgameMenu(this);

        this.playground= new AcgamePlayground(this);
    }
}
