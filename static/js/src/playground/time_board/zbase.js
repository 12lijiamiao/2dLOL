class TimeBoard extends AcGameObject
{
    constructor(playground)
    {
        super();
        this.playground = playground;
        this.ctx =this.playground.GameMap.ctx;
        this.time = 360;
        this.esp = 0.01;
    }

    update()
    {
        if (this.time > this.esp)
            this.time -= this.timedate / 1000;
        else
            this.time = 0;

        this.render();
    }

    render()
    {
        let x = this.playground.real_width / 8;
        let scale = this.playground.scale;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(this.playground.width - x * scale - this.playground.width * 0.1,0,this.playground.width * 0.1,this.playground.height * 0.2);
        this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
        this.ctx.fillStyle="rgba(45,12,19,1)";
        this.ctx.textAlign = "center";

        let min = Math.floor(this.time /60);
        let ss = Math.floor(this.time) % 60;

        if (ss < 10)
        {
            ss = "0"+ss;
        }

        this.ctx.fillText(min +" : "+ss,this.playground.width - x * scale - this.playground.width * 0.05,this.playground.height*0.15);
    }
}
