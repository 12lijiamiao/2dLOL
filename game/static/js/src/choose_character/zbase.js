class ChooseCharacter{
    constructor(root)
    {
        this.root = root;

        this.$choose_character = $(`
    <div class = "ac_game_choose_character">
        <audio class="ac_game_choose_character_hutao" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/hutao.mp3" type="audio/mpeg"></audio>
        <audio class="ac_game_choose_character_shenli" src="https://app730.acapp.acwing.com.cn/static/audio/choose_character/shenli.mp3" type="audio/mpeg""></audio>
       <div class ="ac_game_choose_character_total">
            <div class ="ac_game_item">
                <div class="ac_game_character_left" >
                    <div class ="ac_game_character_title">
                        神里凌华
                    </div>
                    <div class ="ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/fireball.png">
                        <div>
                            火球术： 向指定方向发射火球，q按键施法 CD：2秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src ="https://app730.acapp.acwing.com.cn/static/image/playground/skill/flash.png">
                        <div>
                            闪现: 向指定方向进行一段位移， f按键施法 CD: 4秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/guangdun.jpeg">
                        <div>
                            光盾: 在自己附近生成光盾， 抵挡一切伤害 r按键施法 CD:8秒 有效时间: 3秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/greenarrow.png">
                        <div>
                            光箭：指定一个方向，发出具有穿透效果光箭 d按键施法 CD: 8秒
                        </div>
                    </div>
                </div>
            </div>
            <div class ="ac_game_item">
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
            <div class="ac_game_item">
                <div class="ac_game_character_right" >
                    <div class ="ac_game_character_title">
                        胡桃
                    </div>
                    <div class ="ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/fireball.png">
                        <div>
                            火球术： 向指定方向发射火球，q按键施法 CD：2秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src ="https://app730.acapp.acwing.com.cn/static/image/playground/skill/flash.png">
                        <div>
                            闪现: 向指定方向进行一段位移， f按键施法 CD: 4秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/all_fireball.png">
                        <div>
                            召唤术: 向四面八方发射 10 颗火球，r键施法 CD: 8秒
                        </div>
                    </div>
                    <div class = "ac_game_character_skill">
                        <img width = "50" src = "https://app730.acapp.acwing.com.cn/static/image/playground/skill/cureball.jpg">
                        <div>
                            天使之拥：指定一个位置产生一个光阵,给自己以及队友回复生命 d按键施法 CD: 8秒 有效时间: 3秒
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`);
        this.$choose_character_menu = this.$choose_character.find(".ac_game_choose_character_body")
        this.$choose_character_image_hutao = this.$choose_character.find(".ac_game_choose_character_hutao img");
        this.$choose_character_image_shenli = this.$choose_character.find(".ac_game_choose_character_shenli img");

        this.$character_right = this.$choose_character.find(".ac_game_character_right");
        this.$character_left = this.$choose_character.find(".ac_game_character_left");
        this.$character_right.hide();
        this.$character_left.hide();

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

    choose_character_show()
    {
        this.$choose_character_menu.show();
    }

    add_events()
    {
        let outer = this;
        this.$choose_character_image_hutao.mouseover(function()
        {
                outer.$choose_character_bgm_hutao.play();
                outer.$character_right.fadeIn();

        });
        this.$choose_character_image_hutao.mouseout(function(){
                outer.$character_right.fadeOut();
        })
        

        this.$choose_character_image_shenli.mouseover(function()
        {
               outer.$choose_character_bgm_shenli.play();
               outer.$character_left.fadeIn();
        });

        this.$choose_character_image_shenli.mouseout(function(){
               outer.$character_left.fadeOut();
        });
        this.$choose_character_image_hutao.click(function(){
            outer.hide();
            outer.root.playground.work = "hutao";
            outer.root.playground.show();
        });
        this.$choose_character_image_shenli.click(function(){
            outer.hide();
            outer.root.playground.work = "shenli";
            outer.root.playground.show();
        });
    }

    hide()
    {
        this.$choose_character_menu.hide();
        this.$choose_character.hide();
    }
    show()
    {
        this.$choose_character.show();
        this.choose_character_show();
    }
}
