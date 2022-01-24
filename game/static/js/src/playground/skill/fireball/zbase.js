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
