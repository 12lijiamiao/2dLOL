class GameMap extends AcGameObject{
    constructor(playground)
    {
        super();
        this.playground = playground;

        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.playground.$playground.append(this.$canvas);
        this.walls= [];
        this.start();
    }

    start()
    {
        this.create_walls();
    }

    create_walls()
    {
        let color = "rgba(255,255,255,0.5)";
        let unit = this.playground.real_width / 20;
        for( let i = 0 ;i < 20; i++)
        {
            for (let j =0; j< 20 ;j++)
            {
                this.x = i * unit;
                this.y = j * unit;
                this.walls.push(new Wall(this.playground,this.ctx,this.x,this.y,color));
            }
        }
    }

    resize()
    {
        this.ctx.canvas.height= this.playground.height;
        this.ctx.canvas.width = this.playground.width;
    }

    update()
    {
        this.resize();
        this.render();
    }

    render()
    {
        this.ctx.fillStyle = "rgba(176,223,229,1)";
        this.ctx.fillRect( 0, 0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}
