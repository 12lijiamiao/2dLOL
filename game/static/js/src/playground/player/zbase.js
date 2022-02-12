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

