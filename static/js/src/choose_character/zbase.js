class ChooseCharacter{
    constructor(root)
    {
        this.root = root;

        this.$choose_character = $(`
    <div class = "ac_game_choose_character">
        <audio class="ac_game_choose_character_hutao" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/hutao.mp3" type="audio/mpeg"></audio>
        <audio class="ac_game_choose_character_shenli" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/shenli.mp3" type="audio/mpeg""></audio>
        <div class ="ac_game_choose_character_body">
            <div class = "ac_game_choose_character_item">
                角色选择
            </div>
            <div class = "ac_game_choose_character_image">
                <div class = "ac_game_choose_character_image_item ac_game_choose_character_shenli">
                    <img width = "70" src="https://app730.acapp.acwing.com.cn/static/image/choose_character/shenli.jpg">
                </div>
                &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                <div class = "ac_game_choose_character_image_item ac_game_choose_character_hutao">
                    <img width = "70" src="https://app730.acapp.acwing.com.cn/static/image/choose_character/hutao.png">
                </div>
            </div>
        </div>
    </div>
`)
        this.$choose_character_image_hutao = this.$choose_character.find(".ac_game_choose_character_hutao img");
        this.$choose_character_image_shenli = this.$choose_character.find(".ac_game_choose_character_shenli img");

        this.hide();

        this.root.$ac_game.append(this.$choose_character);

        this.$choose_character_bgm_hutao = document.getElementsByClassName('ac_game_choose_character_hutao')[0];
        this.$choose_character_bgm_shenli = document.getElementsByClassName('ac_game_choose_character_shenli')[0];
        this.start();
    }
    start()
    {
        this.add_events()
    }

    add_events()
    {
        let outer = this;
        console.log(this.$choose_character_bgm_hutao);
        this.$choose_character_image_hutao.mouseover(function()
        {
                outer.$choose_character_bgm_hutao.play();
        });
        
        this.$choose_character_image_shenli.mouseover(function()
        {
               outer.$choose_character_bgm_shenli.play();
        });
        this.$choose_character_image_hutao.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$choose_character_image_shenli.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
    }

    hide()
    {
        this.$choose_character.hide();
    }
    show()
    {
        this.$choose_character.show();
    }
}
