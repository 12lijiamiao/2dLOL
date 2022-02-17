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

    attack(player,attackee_player)
    {
        let angle = Math.atan2(player.y-this.y,player.x-this.x);

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
            if(player !== this.player && this.is_attack(player,player.x , player.y , player.radius))
            {
                this.attack(player,this.player);
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

        for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
        {
            let angle = Math.random()*Math.PI*2;
            let radius = Math.random() * 0.005;
            let move_length = Math.random() * 0.05 ;
            let speed = 0.15;

            new FireWorks(this.playground,this,this.x,this.y,this.color,radius,angle,move_length,speed);

        }
        this.render();
    }

    render()
    {
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
