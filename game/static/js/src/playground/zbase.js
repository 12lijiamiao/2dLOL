class AcgamePlayground{
    constructor(root)
    {
        this.root = root;
        this.$playground = $(`<div class = "ac_game_playground" ></div>`);
        this.hide();

        this.root.$ac_game.append(this.$playground);
        this.height = this.$playground.height();
        this.width = this.$playground.width();
    }

    get_random_color()
    {
        let colors = ["green","pink","red","blue","yellow","gray" ,"purple" ,"gold"];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    show()
    {
        this.GameMap = new GameMap(this);
        this.plays=[];
        this.plays.push(new Player(this,this.width/2,this.height/2,this.height*0.15,this.height*0.05,"white",true));
        for(let i = 0 ; i < 5 ;i++)
            this.plays.push(new Player(this,this.width/2,this.height/2,this.height*0.15,this.height*0.05,this.get_random_color(),false));
        this.$playground.show();
    }

    hide()
    {
        this.is_doing = false;
        this.$playground.hide();
    }

}
