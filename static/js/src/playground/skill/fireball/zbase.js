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
