class KillBoard extends AcGameObject
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
        this.time -= this.timedate / 1000;

        if (this.time < this.esp)
        {
            this.destory();
        }

        this.render();
    }

    render()
    {
        let x = this.playground.real_width / 8;
        let scale = this.playground.scale;
        this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
        this.ctx.fillStyle="rgba(45,12,19,1)";
        this.ctx.textAlign = "center";

        let id = this.playground.plays[0].id;

        let kill_cnt = this.playground.kill_cnt;

        this.ctx.fillText(kill_cnt[id % 2]+" : "+kill_cnt[(id + 1) % 2],this.playground.width - x * scale - this.playground.width * 0.05,this.playground.height*0.05);
    }
}
