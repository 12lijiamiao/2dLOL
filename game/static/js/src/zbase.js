class AcGame{
    constructor(id)
    {
        this.id = id;

        this.$ac_game = $('#' + id);
        this.menu = new AcgameMenu(this);

        this.playground= new AcgamePlayground(this);
    }
}
