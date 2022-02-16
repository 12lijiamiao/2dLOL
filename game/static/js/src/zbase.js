export class AcGame{
    constructor(id,acwingos)
    {
        this.id = id;

        this.$ac_game = $('#' + id);
        this.acwingos = acwingos;
        this.settings = new AcgameSettings(this);
        this.choose_character = new ChooseCharacter(this);
        this.playground= new AcgamePlayground(this);
        this.menu = new AcgameMenu(this);

        this.$menu_bgm_item=$(`
<audio class="ac-game-menu-bgm" src="https://app730.acapp.acwing.com.cn/static/audio/menu/menu.mp3" preload="auto" autoplay="autoplay" loop="loop"></audio>
`)
        this.$menu_bgm= document.getElementsByClassName('ac-game-menu-bgm')[0];
        this.$ac_game.append(this.$menu_bgm_item);
        this.$menu_bgm_item.show();
    }



}
