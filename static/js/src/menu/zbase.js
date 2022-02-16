class AcgameMenu{
   constructor(root)
   {
      this.root = root ;
      this.$menu =$(`
<div class ="ac_game_menu">
   <div class = "ac_game_menu_field">
        <div class = "ac_game_menu_item ac_game_menu_item_dan">
        单人模式
        </div>
        <br>
        <div class = "ac_game_menu_item ac_game_menu_item_shuang">
        多人对战
        </div>
        <br>
        <div class = "ac_game_menu_item ac_game_menu_item_settings">
        设置
        </div>
   </div>
</div>
`);

       this.$menu.hide();
       this.root.$ac_game.append(this.$menu);
       
       this.$dan = this.$menu.find(".ac_game_menu_item_dan");
       this.$shuang = this.$menu.find(".ac_game_menu_item_shuang");
       this.$settings = this.$menu.find(".ac_game_menu_item_settings");

       this.start()
   }
   start()
   {
       this.click_events();
   }
   click_events()
   {
       let outer = this;
       this.$dan.click(function(){
            outer.hide();
            outer.root.playground.mode = "danren";
            outer.root.choose_character.show();
       });
       this.$shuang.click(function(){
            outer.hide();
            outer.root.playground.mode = "duoren";
            outer.root.choose_character.show();
       });
       this.$settings.click(function(){
           if(outer.root.settings.platform === "web")
           {
               outer.root.settings.remote_logout();
           }
           else
           {
               outer.root.acwingos.api.window.close();
           }
       });
   }
    show(){//menu界面
        this.$menu.show();
    }
    hide(){
        this.$menu.hide();
    }



}

