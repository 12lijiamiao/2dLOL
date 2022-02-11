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
