class GameBoard extends AcGameObject
{
    constructor(playground,attackee_player_img,attacked_player_img,color)
    {
        super();
        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;
        this.attackee_player_img = attackee_player_img;
        this.attacked_player_img = attacked_player_img;
        this.coldtime = 3 ;
        this.esp = 0.01;
        this.color = color;
    }

    update()
    {
        this.coldtime -= this.timedate / 1000;
        if (this.coldtime < this.esp)
            this.destory();

        this.render();
    }

    render()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.playground.width*0.25,this.playground.height*0.2,this.playground.width*0.5,this.playground.height*0.1);

        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.25,this.playground.height*0.25,this.playground.height*0.05,Math.PI*0.5,Math.PI*1.5,false);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.75,this.playground.height*0.25,this.playground.height*0.05,Math.PI*0.5,Math.PI*1.5,true);
        this.ctx.fill();

        this.ctx.font = this.playground.height*0.05 +"px '微软雅黑'";
        this.ctx.fillStyle = "rgba(48,22,28,1)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("击      败",this.playground.width/2,this.playground.height * 0.25);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.3, this.playground.height*0.25, this.playground.height*0.05, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.attackee_player_img, this.playground.width*0.3 - this.playground.height*0.05, this.playground.height*0.25 - this.playground.height*0.05,this.playground.height*0.1,this.playground.height*0.1);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.playground.width*0.7, this.playground.height*0.25, this.playground.height*0.05, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.attacked_player_img, this.playground.width*0.7 - this.playground.height*0.05, this.playground.height*0.25 - this.playground.height*0.05,this.playground.height*0.1,this.playground.height*0.1);
        this.ctx.restore();
    }
}
