class AcgamePlayground{
    constructor(root)
    {
        this.root = root;
        this.$playground = $(`<div class = "ac_game_playground" ></div>`);
        this.hide();
        this.start();
    }

    start()
    {
        let outer = this;
        $(window).resize(function(){
            outer.resize();
            if (outer.chatitem)
                outer.chatitem.resize();
        });
    }

    get_random_color()
    {
        let colors = ["green","pink","red","blue","yellow","gray" ,"purple" ,"gold"];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    resize()
    {
        this.width=this.$playground.width();
        this.height= this.$playground.height();
        let unit = Math.min(this.height / 9,this.width / 16);
        this.height = unit*9;
        this.width = unit*16;
        this.scale=this.height;


        this.real_width = this.real_height = 3;

    }

    show()
    {
        let outer = this;
        this.root.$ac_game.append(this.$playground);
        this.resize();
        this.player_cnt = 0;
        this.foucs = null;
        this.state = "waiting";
        this.plays = [];
        this.GameMap = new GameMap(this);
        this.notice_board = new NoticeBoard(this);
        this.plays.push(new Player(this,this.real_width/2,this.real_height/2,0.15,0.05,"white","me",outer.root.settings.username,outer.root.settings.photo,null,this.work));
        this.foucs = this.plays[0];
        this.min_map = new MinMap(this,this.GameMap.ctx);
        if(this.mode === "danren")
        {
            for(let i = 0 ; i < 5 ;i++)
                this.plays.push(new Player(this,this.real_width/2,this.real_height/2,0.15,0.05,this.get_random_color(),"ai",null,null,i));
        }
        else if (this.mode === "duoren")
        {
            this.chatitem = new ChatItem(this);
            this.mps = new MultiplayerSocket(this);
            this.mps.uuid = this.plays[0].uuid;

            this.mps.ws.onopen = function()
            {
                outer.mps.send_create_player(outer.root.settings.username,outer.root.settings.photo,outer.work);
            };

        }
        this.$playground.show();
    }

    hide()
    {
        this.is_doing = false;
        this.$playground.hide();
    }

    

}
