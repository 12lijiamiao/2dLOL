class GameMap extends AcGameObject{
    constructor(playground)
    {
        super();
        this.playground = playground;

        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.playground.$playground.append(this.$canvas);
        console.log(this.playground.height);
    }

    resize()
    {
        this.ctx.canvas.height= this.playground.height;
        this.ctx.canvas.width = this.playground.width;
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }

    update()
    {
        this.resize();
        this.render();
    }

    render()
    {
        this.ctx.fillStyle = "rgba(0 ,0 ,0 , 0.2)";
        this.ctx.fillRect( 0, 0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}
