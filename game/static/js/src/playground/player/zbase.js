class Player extends AcGameObject
{
    constructor(playground,x,y,speed,radius,color,character,username,photo,id,work)
    {
        super();
        this.playground = playground;
        this.color = color;
        this.x= x;
        this.y= y;
        this.ctx = this.playground.GameMap.ctx;
        this.radius= radius;
        this.vx = 0;
        this.vy = 0;
        this.damage_vx=0;
        this.damage_vy=0;
        this.damage_speed=0
        this.speed = speed;
        this.character = character;
        this.move_length=0;
        this.esp = 0.01;
        this.cur_skill = null;
        this.flash_angle = 0;
        this.is_flash = false;
        this.spend_time=0;
        this.photo = photo;
        this.username = username;
        this.id = id;
        this.fireballs=[];
        this.greenarrows=[];
        this.skill_r_time = 0;
        if (this.character !== "ai") {
            this.img = new Image();
            this.img.src = this.photo;
            this.work = work;
            this.skill_d = null;
            this.skill_d_coldtime=8;
            this.skill_r = null;
            this.skill_r_coldtime=8;
            this.fireball_coldtime = 2;
            this.flash_coldtime = 4;
            if(this.character === "me")
            {
                this.fireball_img = new Image();
                this.fireball_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/fireball.png";
                this.flash_img = new Image();
                this.flash_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/flash.png";
                if (this.work === "hutao")
                {
                    this.skill_r_img = new Image();
                    this.skill_r_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/all_fireball.png";
                    this.skill_d_img = new Image();
                    this.skill_d_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/cureball.jpg";
                }
                else if (this.work === "shenli")
                {
                    this.skill_r_img = new Image();
                    this.skill_r_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/guangdun.jpeg";
                    this.skill_d_img = new Image();
                    this.skill_d_img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/greenarrow.png";
                }
            }
        }
        else
        {
            this.img=new Image();
            this.img.src = "https://app730.acapp.acwing.com.cn/static/image/playground/renji.jpg";
        }


        this.f = 0.9;

    }
    
    search_id()
    {
        let cnt = [0,0,0,0,0,0];
        for (let i=0 ;i<this.playground.plays.length; i++)
        {
            let player = this.playground.plays[i];
            cnt[player.id]++;
        }

        for(let i = 0;i<6 ;i++)
        {
            if (!cnt[i])
            {
                this.playground.plays[0].id = i ;
                break;
            }
        }
    }

    start()
    {
        this.playground.player_cnt ++;
        this.playground.notice_board.write("已就绪 ："+this.playground.player_cnt +"人");

        if(this.playground.player_cnt >= 4)
        {
            this.playground.state = "fighting";
            this.playground.notice_board.write("Fighting");
            this.search_id();

            if (this.playground.mode === "duoren")
            {
                for (let i=0 ;i<this.playground.plays.length;i++)
                {
                    let player = this.playground.plays[i];
                    if (player.id % 2 === 0)
                    {
                        player.x = this.playground.width * 0.5 / this.playground.scale;
                        player.y = 0.5;
                    }
                    else
                    {
                        player.x = 3 - this.playground.width * 0.5 / this.playground.scale;
                        player.y = 2.5;
                    }
                }

                this.playground.min_map.id = this.playground.plays[0].id % 2;
                this.playground.chatitem.player_id = this.playground.plays[0].id % 2;
            }
        }

        if(this.character === "me")
        {
            this.add_listening_events();
        }
        else if (this.character === "ai")
        {
            let tx = Math.random() * this.playground.real_width;
            let ty = Math.random() * this.playground.real_height;

            this.move_to(tx,ty);;
        }
    }

    add_listening_events()
    {
        let outer = this;

        this.playground.GameMap.$canvas.keydown(function(e){

            if (outer.playground.mode === "duoren")
            {
                if (e.which === 13)
                {
                    outer.playground.chatitem.show_input();
                    return false;
                }
                else if (e.which === 27)
                {
                    outer.playground.chatitem.hide_input();
                    return false;
                }
            }
            
            if(outer.playground.state !== "fighting")
                return true;
            if(e.which === 81 && outer.fireball_coldtime < outer.esp)
                outer.cur_skill = "fireball";
            else if(e.which === 82 && outer.skill_r_coldtime < outer.esp)
            {
                outer.skill_r_coldtime = 8;
                if (outer.work === "hutao")
                {
                    outer.all_shoot_fireball();
                }
                else if (outer.work === "shenli")
                {
                    outer.skill_r_time = 3;
                    if (outer.playground.mode === "duoren")
                    {
                        let tx = 0;
                        let ty = 0;
                        let uuid = 0;
                        outer.playground.mps.send_fireball(tx,ty,uuid,"guangdun");
                    }
                }
            }
            else if(e.which === 70 && outer.flash_coldtime < outer.esp)
                outer.cur_skill = "flash";
            else if(e.which === 68 && outer.skill_d_coldtime < outer.esp)
                outer.skill_d = "ready";

        });

        this.playground.GameMap.$canvas.on("contextmenu",function(){
            return false;
        });

        this.playground.GameMap.$canvas.mousedown(function(e){
            const rect = outer.ctx.canvas.getBoundingClientRect();

            let tx = ( e.clientX - rect.left ) / outer.playground.scale + outer.x - 0.5*outer.playground.width / outer.playground.scale;
            let ty = ( e.clientY - rect.top ) / outer.playground.scale + outer.y - 0.5;
            // if (outer.playground.state === "over" && e.which === 3)
            //{

            //  outer.playground.root.menu.show();
            //  outer.playground.hide();
            // }

            if(outer.playground.state !== "fighting")
                return true;

            if (tx < 0 || ty < 0 || tx > outer.playground.real_width || ty > outer.playground.real_height )
                return true;

            for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
            {
                let angle = Math.random()* Math.PI * 2;
                let radius = 0.005;
                let move_length =  0.05 ;
                let speed = 0.15;
                new FireWorks(outer.playground,outer,tx,ty,"rgba(0,0,0,0.7)",radius,angle,move_length,speed);

            }

            if(e.which === 3 )
            {
                outer.move_to(tx,ty);
                if (outer.playground.mode === "duoren")
                {
                    outer.playground.mps.send_move_to(tx,ty);
                }
            }
            else if (e.which === 1)
            {
                if(outer.cur_skill === "fireball")
                {
                    let fireball = outer.shoot_fireball(tx,ty,0.8,"rgba(250,93,25,0.8)");
                    outer.cur_skill =null;
                    outer.fireball_coldtime = 2;

                    if (outer.playground.mode === "duoren")
                    {
                        outer.playground.mps.send_fireball(tx,ty,fireball.uuid,"fireball");
                    }

                }
                else if(outer.cur_skill === "flash")
                {
                    outer.flash_angle = Math.atan2(ty - outer.y ,tx - outer.x);
                    outer.is_flash = true;
                    outer.flash_coldtime = 4;
                }
                else if (outer.skill_d === "ready")
                {
                    outer.skill_d_coldtime = 8;
                    if (outer.work === "shenli")
                    {
                        let greenarrow = outer.shoot_greenarrow(tx,ty);
                        outer.skill_d =null;

                        if (outer.playground.mode === "duoren")
                        {
                            outer.playground.mps.send_fireball(tx,ty,greenarrow.uuid,"greenarrow");
                        }
                    }
                    else if(outer.work === "hutao")
                    {
                        let cureball = outer.shoot_cureball(tx,ty);
                        outer.skill_d =null;

                        if (outer.playground.mode === "duoren")
                        {
                            outer.playground.mps.send_fireball(tx,ty,cureball.uuid,"cureball");
                        }
                    }
                }
            }
        });
    }

    attacked(angle , damage,attackee,events)
    {
        for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
        {
            let angle = Math.random()*Math.PI*2;
            let radius = Math.random() * 0.01;
            let move_length = Math.random() * 0.15 ;
            let speed = 0.15;

            new FireWorks(this.playground,this,this.x,this.y,this.color,radius,angle,move_length,speed);

        }
        this.radius -= damage;
        if(this.radius < this.esp)
        {

            if (this.playground.mode === "danren")
            {
                if (attackee.character === "me")
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(27,167,132,0.7)");
                }
                else
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(191,53,83,0.7)");
                }
            }
            else if (this.playground.mode === "duoren")
            {
                if (this.playground.min_map.id === attackee.id % 2)
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(27,167,132,0.7)");
                }
                else
                {
                    new GameBoard(this.playground,attackee.img,this.img,"rgba(191,53,83,0.7)");
                }

            }

            this.destory();
            return false;
        }
        if(events === "fireball")
        {
            this.speed *= this.f;
            this.damage_speed = damage * 80;

            this.damage_vx = Math.cos(angle);
            this.damage_vy = Math.sin(angle);
        }
    }

    cureball_attacked(damage)
    {
        for(let i = 0 ;i < Math.random()*20 + 10 ;i++)
        {
            let angle = Math.random()*Math.PI*2;
            let radius = Math.random() * 0.005;
            let move_length = Math.random() * 0.1 ;
            let speed = 0.15;
            let x = this.x + Math.cos(angle) * move_length;
            let y = this.y + Math.sin(angle) * move_length;

            new FireWorks(this.playground,this,x,y,this.color,radius,angle,move_length,speed);
        }
        if (this.radius < 0.05)
        {
            this.radius += damage;
            this.speed *=1.1;
        }

    }

    receive_attacked(attackee,ball_uuid,angle,damage,x,y,events)
    {
        if(events === "fireball")
            attackee.fireball_destory(ball_uuid);
        if(events === "greenarrow" && this.skill_r_time > this.esp)
            attackee.greenarrow_destory(ball_uuid);

        this.x = x;
        this.y = y;
        if (events !== "cureball")
        {
            if(this.skill_r_time < this.esp)
                this.attacked(angle,damage,attackee,events);
        }
        else if (events === "cureball")
        {
            this.cureball_attacked(damage);
        }
    }

    shoot_greenarrow(tx,ty)
    {
        let color = "rgb(254,215,26,0.7)";
        let angle = Math.atan2(ty-this.y,tx-this.x);
        let speed = 1.5;
        let move_length = 1;
        return new GreenArrow(this.playground,this,this.x,this.y,speed,move_length,angle,color);
    }

    shoot_fireball( tx , ty,speed,color)
    {
        let angle = Math.atan2(ty-this.y,tx-this.x);
        let move_length = 0.8;
        let radius =  0.01;
        return new FireBall(this.playground,this,this.x,this.y,speed,angle,move_length,radius);
    }

    shoot_cureball(tx , ty)
    {
        return new CureBall(this.playground,this,tx,ty);
    }

    all_shoot_fireball()
    {
        for(let i = 0 ; i < 10; i++)
        {
            let angle = (Math.PI * 2)/10*i;

            let tx = this.x + Math.cos(angle);
            let ty = this.y + Math.sin(angle);

            let speed = 0.8;
            let color = "rgba(250,93,25,0.8)";
            let fireball =this.shoot_fireball(tx,ty,speed,color);
            if (this.playground.mode === "duoren")
            {
                this.playground.mps.send_fireball(tx,ty,fireball.uuid,"fireball");
            }
        }
    }

    flash(angle)
    {
        let distance = 0.2;
        this.x += distance * Math.cos(angle);
        this.y += distance * Math.sin(angle);
        this.vx = this.vy =this.move_length = 0;

        if (this.out_of_map(this.x,this.y))
        {
            this.damage_speed = 0.005 * 80;

            this.damage_vx = -1 * Math.cos(angle);
            this.damage_vy = -1 * Math.sin(angle);
        }

        if (this.x - this.radius < this.esp * 0.1)
        {
            this.x = this.radius + this.esp * 0.101;
        }

        if (this.y - this.radius< this.esp * 0.1)
        {
            this.y = this.radius + this.esp * 0.101;
        }

        if (this.x + this.radius > this.playground.real_width - this.esp * 0.1)
        {
            this.x = this.playground.real_width - this.radius - this.esp * 0.101;
        }

        if (this.y + this.radius> this.playground.real_height - this.esp * 0.1)
        {
            this.y = this.playground.real_height - this.radius - this.esp * 0.101;
        }
    }

    get_distance(x1,y1,x2,y2)
    {
        let dx = x1 - x2;

        let dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to( tx, ty)
    {
        this.move_length = this.get_distance(tx,ty,this.x,this.y);

        let angle = Math.atan2(ty-this.y,tx-this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    out_of_map(x , y)
    {
        if (x - this.radius < this.esp*0.1 || x + this.radius > this.playground.real_width - this.esp*0.1)
            return true;

        if (y - this.radius < this.esp*0.1 || y + this.radius > this.playground.real_height - this.esp*0.1)
            return true;
        return false;
    }

    update_time()
    {
        if(this.skill_r_time > this.esp)
            this.skill_r_time -= this.timedate/1000;
        else
            this.skill_r_time = 0;

        if (this.fireball_coldtime > this.esp)
            this.fireball_coldtime -= this.timedate/1000;
        else
            this.fireball_coldtime =0;

        if (this.flash_coldtime > this.esp)
            this.flash_coldtime -= this.timedate/1000;
        else
            this.flash_coldtime =0;

        if (this.skill_d_coldtime > this.esp)
            this.skill_d_coldtime -= this.timedate/1000;
        else
            this.skill_d_coldtime =0;

        if(this.skill_r_coldtime > this.esp)
            this.skill_r_coldtime -= this.timedate/1000;
        else
            this.skill_r_coldtime = 0;
    }

    update_win()
    {
        if (this.playground.state === "fighting" && this.playground.mode === "danren" && this.playground.plays.length === 1 && this.character === "me")
        {
            this.playground.scoreboard.win();
            this.playground.state = "over";
            this.playground.foucus = null;
        }
    }

    update()
    {
        this.update_win();
        this.update_time();
        this.spend_time += this.timedate / 1000;

        if(this.character === "ai" && this.spend_time > 4 )
        {
            if(Math.random() < 1 / 100.0)
            {
                let player = this.playground.plays[Math.floor(Math.random() * this.playground.plays.length)];
                let speed =  0.8;

                let distance = this.get_distance(this.x,this.y,player.x,player.y);

                let v = speed * this.timedate /1000;
                let time = distance / v;

                let tx = player.x + time * player.speed * player.timedate /1000 * player.vx;
                let ty = player.y + time * player.speed * player.timedate /1000 * player.vy;
                if(this !== player)
                    this.shoot_fireball(tx,ty,0.8,"rgba(250,93,25,0.8)")
            }
            else if (Math.random() > 0.999)
            {
                if(this.playground.plays.length > 1)
                {
                    this.all_shoot_fireball();
                }
            }


        }

        if (this.out_of_map(this.x,this.y))
        {
            if (this.x < this.esp * 0.1)
            {
                this.x = this.radius;
            }

            if (this.y < this.esp * 0.1)
            {
                this.y = this.radius;
            }

            if (this.x > this.playground.real_width - this.esp * 0.1)
            {
                this.x = this.playground.real_width - this.radius;
            }

            if (this.y > this.playground.real_height - this.esp * 0.1)
            {
                this.y = this.playground.real_height - this.radius;
            } 
            if (this.damage_speed >this.esp)
            {
                this.damage_speed = 0.01 * 80;

                this.damage_vx = -1 * this.damage_vx;
                this.damage_vy = -1 * this.damage_vy;
            }
            else if(this.move_length >this.esp)
            {
                this.damage_speed = 0.005 * 80 ;
                this.damage_vx = -1 * this.vx;
                this.damage_vy = -1 * this.vy;
            }

        }


        if(this.damage_speed > this.esp)
        {
            this.vx = 0 ;
            this.vy = 0 ;
            this.move_length=0;

            let moved = this.damage_speed * this.timedate /1000;
            this.x += moved * this.damage_vx;
            this.y += moved * this.damage_vy;
            this.damage_speed *= this.f;
        }
        else{
            if(this.cur_skill === "flash" && this.is_flash)
            {
                this.cur_skill = null;
                this.is_flash = false;
                this.flash(this.flash_angle);

                if (this.playground.mode === "duoren" && this.character === "me")
                {
                    this.playground.mps.send_flash(this.flash_angle);
                }
            }
            else
            {
                if(this.move_length < this.esp)
                {
                    this.vx = this.vy = 0
                    this.move_length = 0;
                    if(this.character === "ai")
                    {

                        let tx = Math.random() * this.playground.real_width;
                        let ty = Math.random() * this.playground.real_width;

                        this.move_to(tx,ty);
                    }
                }
                else
                {
                    let moved = Math.min(this.move_length,this.speed * this.timedate /1000);

                    this.x += this.vx * moved;
                    this.y += this.vy * moved;

                    this.move_length -= moved;

                }
            }
        }
        this.render();

    }

    render()
    {
        if(this.character === "me")
            this.render_skill();
        let x = this.x - this.playground.plays[0].x + 0.5 * this.playground.width / this.playground.scale;
        let y = this.y - this.playground.plays[0].y + 0.5 ;

        let scale = this.playground.scale;


        if (this.skill_r_time >this.esp)
        {
            this.ctx.beginPath();
            this.ctx.arc(x*scale,y*scale,this.playground.height * 0.2,this.radius * scale,0,Math.PI * 2,false);
            this.ctx.fillStyle =  "rgba(254,215,26,0.7)";
            this.ctx.fill();
        }

        if (this.character !== "ai") {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(x * scale, y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, (x - this.radius) * scale, (y - this.radius) * scale, this.radius * 2 * scale, this.radius * 2 * scale);
            this.ctx.restore();
        }else{
            this.ctx.beginPath();
            this.ctx.arc(x * scale,y * scale,this.radius * scale,0,Math.PI * 2 , false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }
    render_skill()
    {
        let skill_radius = 0.05 * this.playground.height;

        let scale = this.playground.height ;
        let  d = scale *0.02;
        this.ctx.fillStyle = "rgba(0,0,0,0.4)";
        this.ctx.fillRect(0.5* this.playground.width - this.playground.height * 0.15,this.playground.height * 0.86,this.playground.height *0.5,this.playground.height *0.14);

        //fireball 
        let x = this.playground.width*0.5 - this.playground.height*0.08;
        let y = this.playground.height * 0.93;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.fireball_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y );
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.fireball_coldtime / 2 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill();

        if (!this.fireball_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Q",x,y+d);
        }

        //flash
        x += scale * 0.12;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.flash_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y );
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.flash_coldtime / 4 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill();

        if (!this.flash_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("F",x,y+d);
        }

        //skill_r
        x += scale * 0.12;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.skill_r_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y );
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.skill_r_coldtime / 8 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill();

        if (!this.skill_r_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("R",x,y+d);
        }
        //skill_d
        x += scale * 0.12;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, skill_radius, 0, Math.PI * 2, false);
        this.ctx.clip();
        this.ctx.drawImage(this.skill_d_img, x - skill_radius, y - skill_radius, skill_radius * 2 , skill_radius * 2);
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y , skill_radius, 0 - Math.PI / 2, -this.skill_d_coldtime / 8 * Math.PI * 2 - Math.PI / 2, true);
        this.ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
        this.ctx.fill(); 
        if (!this.skill_d_coldtime )
        {
            this.ctx.font = this.playground.height*0.05+"px '微软雅黑'";
            this.ctx.fillStyle="rgba(45,12,19,1)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("D",x,y+d);
        }
    }

    on_destory()
    {
        if (this.character === "me")
        {
            if (this.playground.mode === "danren" && this.playground.state === "fighting")
            {
                this.playground.scoreboard.lose();
                this.playground.foucs = null;
            }
            this.playground.state = "over";
            this.playground.notice_board.write("You are over");

        }


        for(let i =0 ;i < this.playground.plays.length ;i ++)
        {
            let player = this.playground.plays[i];
            if(this === player)
            {
                this.playground.plays.splice(i,1);
            }
        }
    }
    fireball_destory(uuid)
    {
        for (let i=0 ; i<this.fireballs.length ;i++ )
        {
            let fireball = this.fireballs[i];
            if (fireball.uuid === uuid)
            {
                fireball.destory();
                break;
            }
        }
    }
    greenarrow_destory(uuid)
    {
        for (let i=0 ; i<this.greenarrows.length ;i++ )
        {
            let greenarrow = this.greenarrows[i];
            if (greenarrow.uuid === uuid)
            {
                greenarrow.destory();
                break;
            }
        }
    }



}

