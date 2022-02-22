class GreenArrow extends AcGameObject
{
    constructor(playground,player,x,y,speed,move_length,angle,color)
    {
        super();
        this.playground = playground;
        this.ctx = this.playground.GameMap.ctx;
        this.start_x = x;
        this.start_y = y;

        this.now_x = this.start_x;
        this.now_y = this.start_y;
        this.angle=angle;

        this.move_length = move_length;
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
        this.color = color;
        this.speed = speed;
        this.damage =0.01;
        this.player = player;
        this.player.greenarrows.push(this);

        this.plan_player =[];
        this.esp = 0.01;
    }

    is_mode(player)
    {
        if (player.username === "boss")
            return true;

        if (this.playground.mode === "duoren")
        {
            if (player.id % 2 !== this.player.id % 2)
            {
                return true;
            }
        }
        else if (this.playground.mode === "danren")
        {
            if (player !== this.player)
            {
                return true;
            }
        }
        return false;
    }

    start()
    {
        for (let i = 0 ;i < this.playground.plays.length;i++)
        {
            this.plan_player.push("0");
        }
    }
    out_of_map(x , y)
    {
        if (x < this.esp*0.1 || x > this.playground.real_width - this.esp*0.1)
            return true;

        if (y < this.esp*0.1 || y > this.playground.real_height - this.esp*0.1)
            return true;

        if (this.playground.mode === "duoren")
        {
            let unit = this.playground.real_width/20;
            let room_x = this.playground.GameMap.room_x;
            let room_y = this.playground.GameMap.room_y;
            for (let i = 0; i < room_x.length; i++)
            {
                    if (room_x[i]<=x && x<=room_x[i] + unit && room_y[i]<=y && y <= room_y[i]+unit)
                        return true;
            }
        }
        return false;
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x2-x1;
        let dy = y2-y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_attack(player,tx ,ty,tr)
    {
        let distance = this.get_distance(tx,ty,this.now_x,this.now_y);
        //if(player.character === "ai" && distance < player.radius * 2 )
        // {

        //   player.cur_skill = "flash";
        //player.is_flash = true;
        // player.flash_angle = this.angle + Math.PI / 2;
        //}

        if (player.skill_r_time > this.esp && distance < 0.2)
            return true;
        if(distance < tr )
            return true;
        return false;
    }

    attack(player,attackee_player)
    {
        let angle = Math.atan2(player.y-this.now_y,player.x-this.now_x);

        if (player.skill_r_time < this.esp)
            player.attacked(angle,this.damage,attackee_player,"greenarrow");

        if (this.playground.mode ==="duoren")
        {
            this.playground.mps.send_attack(player.uuid,this.uuid,this.damage,angle,player.x,player.y,"greenarrow");

        }

        if (player.skill_r_time > this.esp)
            this.destory();
    }

    update_attack()
    {
        for(let i = 0 ; i < this.playground.plays.length ; i++)
        {
            let player = this.playground.plays[i];

            if(this.is_mode(player) && this.is_attack(player,player.x , player.y , player.radius) && this.plan_player[i] === "0")
            {
                this.attack(player,this.player);
                this.plan_player[i] = "1";
            }
        }

    }
    update()
    {
        if (this.out_of_map(this.now_x,this.now_y))
        {
            this.destory();
            return false;
        }

        if (this.player.character !== "enemy")
        {
            this.update_attack();
        }

        this.update_move();

        this.render();
    }

    update_move()
    {
        if(this.move_length < this.esp)
        {
            this.destory();
            return false;
        }
        else 
        {
            let moved = Math.min(this.move_length,this.speed * this.timedate /1000);

            this.now_x += this.vx * moved;
            this.now_y += this.vy * moved;

            this.move_length -= moved;
        }
    }
    render()
    {
        if (!this.playground.foucs) return false ;

        let start_x = this.start_x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let start_y = this.start_y - this.playground.plays[0].y + 0.5 ;

        let now_x = this.now_x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let now_y = this.now_y - this.playground.plays[0].y + 0.5 ;
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.playground.height * 0.01;
        this.ctx.moveTo(start_x * scale,start_y * scale);
        this.ctx.lineTo(now_x * scale,now_y * scale);

        this.ctx.stroke();
        this.ctx.closePath();
    }
    on_destory()
    {
        for (let i =0 ;i<this.player.greenarrows.length;i++)
        {
            let greenarrow =this.player.greenarrows[i];
            if(greenarrow === this)
            {
                this.player.greenarrows.splice(i, 1);
                break;
            }
        }
    }

}
