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
                outer.receive_create_player(uuid,data.username,data.photo,data.id,data.work);
            }
            else if (event === "move_to")
            {
                outer.receive_move_to(uuid,data.tx,data.ty);
            }
            else if (event === "fireball")
            {
                outer.receive_fireball(uuid,data.tx,data.ty,data.ball_uuid,data.events);
            }
            else if (event === "attack")
            {
                outer.receive_attack(uuid,data.attacked_uuid,data.ball_uuid,data.damage,data.angle,data.x,data.y,data.events);
            }
            else if (event === "flash")
            {
                outer.receive_flash(uuid,data.angle);
            }
            else if (event === "chat")
            {
                outer.receive_chat(data.massage,data.id,data.mode);
            }
            else if (event === "create_boss")
            {
                outer.receive_create_boss(uuid,data.username,data.photo,data.id,data.state);
            }
            else if (event === "move_boss")
            {
                outer.receive_move_boss(uuid,data.angle,data.move_length);
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
    send_create_player(username,photo,work){

        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"create_player",
            'uuid':outer.uuid,
            'username':username,
            'photo':photo,
            'work':work,
        }));
    }

    receive_create_player(uuid,username,photo,id,work)
    {
        let player = new Player(
            this.playground,
            this.playground.real_width/2,
            this.playground.real_height/2,
            0.15,
            0.05,
            "white",
            "enemy",
            username,
            photo,
            id,
            work
        )

        player.uuid = uuid;
        this.playground.plays.push(player);
    }

    receive_create_boss(uuid,username,photo,id,state)
    {

        this.playground.notice_board.write("Fighting");
        let unit = this.playground.real_width / 20;
        let room_x = [2*unit,3-2*unit];
        let room_y = [3-unit*2,2*unit];

        let index =state;
        let player = new Player(
            this.playground,
            room_x[index],
            room_y[index],
            0.15,
            0.10,
            "white",
            "enemy",
            username,
            photo,
            id,
        )

        player.start_x = room_x[index];
        player.start_y = room_y[index];
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

    receive_move_boss(uuid,angle,move_length)
    {
        let player = this.search_player(uuid);

        if(player)
        {
            let unit = this.playground.real_width /20;
            let move_angle = Math.PI * 2 * angle;
            let length = 1.5 * unit * move_length;
            let tx = player.start_x + Math.cos(move_angle) * length;
            let ty = player.start_y + Math.sin(move_angle) * length;
            
            player.move_to(tx,ty);
        }
    }



    send_fireball(tx,ty,ball_uuid,events)
    {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':'fireball',
            'uuid':outer.uuid,
            'tx':tx,
            'ty':ty,
            'ball_uuid':ball_uuid,
            'events':events,
        }));
    }
    receive_fireball(uuid,tx,ty,ball_uuid,events)
    {
        let player = this.search_player(uuid);
        if (player)
        {
            if(events === "fireball")
            {
                let fireball = player.shoot_fireball(tx,ty,0.8,"rgba(250,93,25,0.8)");
                fireball.uuid = ball_uuid;
            }
            else if (events === "greenarrow")
            {
                let greenarrow = player.shoot_greenarrow(tx,ty);
                greenarrow.uuid = ball_uuid;
            }
            else if (events === "guangdun")
            {
                if (player.skill_b_time > player.esp )
                    player.skill_b_time = 0;
                player.skill_r_time = 3;
            }
            else if (events === "cureball")
            {
                let cureball = player.shoot_cureball(tx,ty);
                cureball.uuid = ball_uuid;
            }
            else if (events === "return_home")
            {
                player.skill_b_time = 3;
                player.vx = player.vy = player.move_length = 0;
            }
            else if (events === "stay")
            {
                player.vx = player.vy = player.move_length = 0;
            }
        }
    }
    send_attack(attacked_uuid,ball_uuid,damage,angle,x,y,events)
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
            'events':events,
        }));
    }

    receive_attack(attackee_uuid,attacked_uuid,ball_uuid,damage,angle,x,y,events)
    {
        let attackee = this.search_player(attackee_uuid);
        let attacked = this.search_player(attacked_uuid);

        if (attackee && attacked) attacked.receive_attacked(attackee,ball_uuid,angle,damage,x,y,events);
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
    send_chat(massage,id,mode)
    {
        let outer =this;
        this.ws.send(JSON.stringify({
            'event':"chat",
            'uuid':outer.uuid,
            'massage':massage,
            'id':id,
            'mode':mode,
        }));

    }
    receive_chat(massage,id,mode)
    {
        if(mode === 1)
            this.playground.chatitem.render_massage(massage);

        if(mode === 0 && id=== this.playground.chatitem.player_id)
            this.playground.chatitem.render_massage(massage);
    }
}
