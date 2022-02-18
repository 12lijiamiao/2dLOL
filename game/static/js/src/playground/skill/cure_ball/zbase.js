class CureBall extends AcGameObject
{
    constructor (playground,player,x,y)
    {
        super();

        this.playground = playground;
        this.ctx =this.playground.GameMap.ctx;
        this.player =player;
        this.x = x;
        this.y = y;
        this.time = 3;
        this.radius = 0.2;
        this.color = "rgba(150,194,78,0.5)";
        this.esp =0.01;
        this.damage = 0.01;
    }

    is_mode(player)
    {
        if (this.playground.mode === "danren")
        {
            if (this.player === player)
                return true;
        }
        else if (this.playground.mode === "duoren")
        {
            if (this.player.id % 2 === player.id % 2)
                return true;
        }
        return false;
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x2-x1;
        let dy = y2-y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_attack(tx ,ty , tr)
    {
        let distance = this.get_distance(tx,ty,this.x,this.y);

        if(distance < this.radius - tr)
            return true;
        return false;
    }

    attack(player,attackee_player)
    {
        let angle = Math.atan2(player.y-this.y,player.x-this.x);
        player.cureball_attacked(this.damage);

        if (this.playground.mode ==="duoren")
        {
            this.playground.mps.send_attack(player.uuid,this.uuid,this.damage,angle,player.x,player.y,"cureball");
        }
    }
    update_attack()
    {
        for (let i=0;i<this.playground.plays.length ;i++)
        {
            let player = this.playground.plays[i];
            if (this.is_mode(player) && this.is_attack(player.x,player.y,player.radius))
            {
                this.attack(player,this.player);
            }
        }
    }
    update()
    {
        this.time -= this.timedate /1000;
        if (this.time < this.esp)
            this.destory();

        if (this.player.character !== "enemy")
            this.update_attack();
        this.render();
    }

    render ()
    {
        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(x * scale ,y * scale, this.radius * scale , 0, Math.PI * 2 ,false);
        this.ctx.fill();
    }
}
