export class AcGame{
    constructor(id,acwingos)
    {
        this.id = id;

        this.$ac_game = $('#' + id);
        this.acwingos = acwingos;
        this.settings = new AcgameSettings(this);

        this.menu = new AcgameMenu(this);

        this.playground= new AcgamePlayground(this);
    }
}
