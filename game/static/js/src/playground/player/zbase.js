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

