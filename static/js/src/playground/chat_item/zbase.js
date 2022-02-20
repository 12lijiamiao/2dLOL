class ChatItem 
{
    constructor(playground)
    {
        this.playground =playground;

        this.$history = $(`<div class="ac_game_chatitem_history">历史记录</div>`);
        this.$input =$(`<input type ="text" class ="ac_game_chatitem_input">`);
        this.id = null;
        this.$history.hide();
        this.$input.hide();
        this.mode = 0;
        this.playground.$playground.append(this.$history);
        this.playground.$playground.append(this.$input);
        this.player_id = -1;

        this.start()
    }

    start()
    {
        this.add_events();
        this.resize();
    }

    add_events()
    {

        let outer= this;
        this.$input.keydown(function(e){
            if (e.which === 27)
            {
                outer.hide_input();
            }
            else if (e.which === 13)
            {
                let text = outer.$input.val();
                if (text && outer.player_id !== -1)
                {
                    console.log(outer.player_id);
                    outer.$input.val("");
                    let massage = outer.write_massage(text,outer.mode);
                    outer.render_massage(massage);
                    outer.playground.mps.send_chat(massage,outer.player_id,outer.mode);
                }
            }
            else if (e.which === 17)
            {
                outer.mode =(outer.mode + 1) % 2;
            }
        });


        this.$history.mousedown(function(e){
            let player = outer.playground.plays[0];
            if (player.character ==="me")
            {
                const rect = player.ctx.canvas.getBoundingClientRect();
                let tx = ( e.clientX - rect.left ) / outer.playground.scale + player.x - 0.5*outer.playground.width / outer.playground.scale;
                let ty = ( e.clientY - rect.top ) / outer.playground.scale + player.y - 0.5;

                if(e.which === 3 )
                {
                    player.move_to(tx,ty);
                    outer.playground.mps.send_move_to(tx,ty);
                }
            }
        });
    }

    resize()
    {
        this.width = this.playground.width * 0.2;
        this.history_height = this.playground.height * 0.3;

        this.margin_left = (this.playground.$playground.width() - this.playground.width) / 2 + this.playground.height * 0.02;
        this.history_top = (this.playground.$playground.height() - this.playground.height) / 2 + this.playground.height / 2;
        this.input_top = this.history_top + 0.02 * this.playground.height + this.history_height;
        this.$history.css({
            "position": "absolute",
            "width": this.width,
            "height": this.history_height,
            "left": this.margin_left,
            "top": this.history_top,

            "color": "white",
            "font-size":  "2vh",
            "overflow": "auto",
            "background-color": "rgba(0, 0, 0, 0.3)",
            "border-radius":"5px",
        });

        this.$input.css({
            "position": "absolute",
            "width": this.width,
            "height": "3vh",
            "left": this.margin_left,
            "top": this.input_top,

            "color": "white",
            "font-size":  "2vh",
            "background-color": "rgba(0, 0, 0, 0.3)",
        });

    }


    show_input()
    {
        this.$input.show();
        this.$input.focus();

        this.show_history();
    }

    hide_input()
    {
        this.$input.hide();
        this.playground.GameMap.$canvas.focus();
    }

    render_massage(text)
    {
        this.$history.append(text);
        this.$history.scrollTop(this.$history[0].scrollHeight);
        this.show_history();
    }

    write_massage(text,mode)
    {
        let username = this.playground.root.settings.username;
        let massage =null;
        if (mode === 0)
            massage = `[[基友]${username}]:${text}`;
        else if(mode === 1)
            massage = `[[全体]${username}]:${text}`;

        let div_massage = `<div>${massage}</div>`
        return div_massage;
    }

    show_history()
    {
        this.$history.fadeIn();

        if (this.id) clearTimeout(this.id);

        let outer = this;
        this.id = setTimeout(function(){
            outer.$history.fadeOut();
            outer.id = null;
        },3000);
    }

}
