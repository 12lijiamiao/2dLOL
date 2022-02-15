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
        this.ctx.font = "20px serif";
        this.ctx.fillStyle="white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text,this.playground.width/2,20);
    }
}
