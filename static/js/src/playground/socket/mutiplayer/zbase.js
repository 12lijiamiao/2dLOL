class MultiplayerSocket{
    constructor(playground)
    {
        this.playground = playground;
        this.ws = new WebSocket("wss://app730.acapp.acwing.com.cn/wss/multiplayer/");

        this.start();
    }

    start ()
    {
        this.receive();
    }

    receive()
    {
        let outer = this;

        this.ws.onmessage = function(e) //e 就是接受的参数  send的那些东西
        {
            let data = JSON.parse(e.data);

            let uuid = data.uuid;
            if (uuid === outer.uuid) return false;

            let event = data.event;
            if(event=== "create_player"){
                outer.receive_create_player(uuid,data.username,data.photo,data.id);
            }
            else if (event === "move_to")
            {
                outer.receive_move_to(uuid,data.tx,data.ty);
            }
            else if (event === "fireball")
            {
                outer.receive_fireball(uuid,data.tx,data.ty,data.ball_uuid);
            }
            else if (event === "attack")
            {
                outer.receive_attack(uuid,data.attacked_uuid,data.ball_uuid,data.damage,data.angle,data.x,data.y)
            }
            else if (event === "flash")
            {
                outer.receive_flash(uuid,data.angle);
            }
        }
    }

    search_player(uuid)
    {

        for(let i=0 ;i < this.playground.plays.length;i++)
        {
            let player = this.playground.plays[i];
            if(player.uuid === uuid)
                return player;
        }
        return null;
    }
    send_create_player(username,photo){

        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"create_player",
            'uuid':outer.uuid,
            'username':username,
            'photo':photo,
        }));
    }

    receive_create_player(uuid,username,photo,id)
    {
        let player = new Player(
            this.playground,
            this.playground.width/2/this.playground.scale,
            0.5,
            0.15,
            0.05,
            "white",
            "enemy",
            username,
            photo,
            id,
        )

        player.uuid = uuid;
        this.playground.plays.push(player);
    }
    send_move_to(tx,ty)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"move_to",
            'uuid':outer.uuid,
            'tx':tx,
            'ty':ty,
        }));
    }

    receive_move_to(uuid,tx,ty)
    {
        let player = this.search_player(uuid);

        if(player) player.move_to(tx,ty);
    }
    send_fireball(tx,ty,ball_uuid)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':'fireball',
            'uuid':outer.uuid,
            'tx':tx,
            'ty':ty,
            'ball_uuid':ball_uuid,
        }));
    }
    receive_fireball(uuid,tx,ty,ball_uuid)
    {
        let player = this.search_player(uuid);

        if (player)
        {
            let fireball = player.shoot_fireball(tx,ty);
            fireball.uuid = ball_uuid;
        }
    }
    send_attack(attacked_uuid,ball_uuid,damage,angle,x,y)
    {

        let outer = this;
        
        this.ws.send(JSON.stringify({
            'event':"attack",
            'uuid':outer.uuid,
            'attacked_uuid':attacked_uuid,
            'ball_uuid':ball_uuid,
            'damage':damage,
            'angle':angle,
            'x':x,
            'y':y,
        }));
    }

    receive_attack(attackee_uuid,attacked_uuid,ball_uuid,damage,angle,x,y)
    {
        
        let attackee = this.search_player(attackee_uuid);
        let attacked = this.search_player(attacked_uuid);
        
        if (attackee && attacked) attacked.receive_attacked(attackee,ball_uuid,angle,damage,x,y);
    }

    send_flash(angle)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"flash",
            'uuid':outer.uuid,
            'angle':angle,
        }));
    }

    receive_flash(uuid,angle)
    {
        let player = this.search_player(uuid);
        
        if (player)  player.flash(angle);
    }
}
