class AcgamePlayground{
    constructor(root)
    {
        this.root = root;
        this.$playground = $(`<div>游戏界面</div>`);
        this.hide();

        this.root.$ac_game.append(this.$playground);
    }

    show()
    {
        this.$playground.show();
    }

    hide()
    {
        this.$playground.hide();
    }

}
