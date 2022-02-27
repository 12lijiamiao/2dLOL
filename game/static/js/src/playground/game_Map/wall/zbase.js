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
