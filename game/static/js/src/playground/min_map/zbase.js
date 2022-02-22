class MinMap extends AcGameObject
{
    constructor(playground,ctx)
    {
        super();
        this.playground = playground;
        this.ctx = ctx;
        this.radius = 0.1;
        this.id = -1;
    }

    update()
    {
        this.render();
    }

    is_mode (player)
    {
        if (this.playground.mode === "duoren" && this.id != -1)
        {
            if (player.id % 2 === this.id)
                return true;
        }
        else
        {
            if (player.character === "me")
                return true;
        }
        return false;
    }

    render()
    {
        let x = this.playground.real_width / 8;

        let y = x;

        let scale = this.playground.scale;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(this.playground.width - x * scale,0,x * scale,y * scale);
        this.x = this.playground.width - this.playground.real_width / 8 * this.playground.scale;
        this.y = this.playground.height - this.playground.real_height / 8 * this.playground.scale;

        if (this.playground.mode === "duoren")
        {
            let unit = this.playground.real_width/20;
            let room_x = this.playground.GameMap.room_x;
            let room_y = this.playground.GameMap.room_y;
            for (let i = 0; i < room_x.length; i++)
            {
                this.ctx.fillStyle = "rgba(54,41,47,0.7)";
                let x =room_x[i] * scale / 8 + this.x;
                let y = room_y[i] * scale / 8;

                this.ctx.fillRect(x,y,unit *scale / 8,unit * scale / 8);
            }
        }

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
                this.ctx.strokeRect(tx/ 8 + this.x, ty/ 8, this.playground.width  / 8, this.playground.height / 8);
            }

            if (this.playground.mode === "duoren" && player.death_time > player.esp)
            {
                continue;
            }

            if (player.username === "boss")
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 ,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "yellow";
                this.ctx.fill();
                continue;
            }

            if (this.is_mode(player))
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 ,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "green";
                this.ctx.fill();
            }
            else
            {
                this.ctx.beginPath();
                this.ctx.arc(x * scale / 8 + this.x,y * scale / 8 ,this.radius * scale / 8,0,Math.PI * 2 , false);
                this.ctx.fillStyle = "red";
                this.ctx.fill();
            }
        }



    }

}
