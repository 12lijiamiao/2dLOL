class Room extends AcGameObject{
    constructor(playground,ctx,x,y,color)
    {
        super();
        this.playground =playground;
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

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(x * scale, y * scale, unit * scale, unit * scale);
    }
    on_destory ()
    {
        for(let i =0 ;i < this.playground.GameMap.rooms.length ;i ++)
        {
            let room = this.playground.GameMap.rooms[i];
            if(room === this)
            {
                this.playground.GameMap.rooms.splice(i,1);
            }
        }
    }
}
