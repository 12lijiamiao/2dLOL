class MinMap extends AcGameObject
{
    constructor(playground,ctx)
    {
        super();
        this.playground = playground;
        this.ctx = ctx;
        this.radius = 0.1;
    }

    update()
    {
        this.render();
    }

    render()
    {
        let x = this.playground.real_width / 8;

        let y = x;

        let scale = this.playground.scale;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(this.playground.width - x * scale,this.playground.height - y * scale,x * scale,y * scale);
        this.x = this.playground.width - this.playground.real_width / 8 * this.playground.scale;
        this.y = this.playground.height - this.playground.real_height / 8 * this.playground.scale;
   

        for (let i =0 ;i < this.playground.plays.length ; i++)
        {
            let player = this.playground.plays[i];


            let x= player.x;
            let y= player.y;
            if (player.character === "me")
            {
                this.ctx.lineWidth = this.playground.height * 0.005;
                this.ctx.strokeStyle = "rgba(115,87,92,1)";
                let tx = x * scale - 0.5 * this.playground.width;
                let ty = y * scale - 0.5 * this.playground.height;
                if (tx < 0)
                {
                    tx = 0;
                }
                if (ty <0)
                {
                    ty = 0;
                }
                if (tx + this.playground.width > this.playground.real_width * this.playground.scale)
                {
                    tx = this.playground.real_width * scale - this.playground.width;
                }
                if (ty + this.playground.height > this.playground.real_height * scale)
                {
                    ty = this.playground.real_height * scale - this.playground.height;
                }
                this.ctx.strokeRect(tx/ 8 + this.x, ty/ 8 + this.y, this.playground.width  / 8, this.playground.height / 8);

                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 + this.y,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "green";
                this.ctx.fill();
            }
            else
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 + this.y,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "red";
                this.ctx.fill();
            }
        }



    }

}
