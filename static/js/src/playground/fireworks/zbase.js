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

        let x=0;
        let y=0;
        if(this.playground.focus_mode)
        {
            x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
            y = this.y - this.playground.plays[0].y + 0.5 ;
        }
        else
        {
            x = this.x - this.playground.focus_point_x + 0.5 * this.playground.width / this.playground.scale;
            y = this.y - this.playground.focus_point_y + 0.5 ;
        }
        this.ctx.beginPath();
        this.ctx.arc(x * this.playground.scale,y * this.playground.scale,this.radius * this.playground.scale,0,Math.PI * 2 ,false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
