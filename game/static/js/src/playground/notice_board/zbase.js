class NoticeBoard extends AcGameObject {
    constructor (playground)
    {
        super();
        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;
        this.text = "已就绪 ： 0 人";
    }

    write(text){
        this.text = text;
    }
    update()
    {
        this.render();
    }
    render()
    {
        this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
        this.ctx.fillStyle="rgba(45,12,19,1)";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text,this.playground.width/2,this.playground.height*0.1);
    }
}
