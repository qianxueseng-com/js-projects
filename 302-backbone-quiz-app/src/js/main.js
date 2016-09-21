'use strict'

import { cardList } from './collection';
import { startView } from './startView';
import { aboutView } from './aboutView';
import { cardView } from './cardView';
import { endView } from './endView';
//import { data } from './data';

//var cardlist = new cardList(data);

var myFirebaseRef = new Firebase("https://shining-heat-1411.firebaseio.com");
myFirebaseRef.on("value", function(data) {
  var cardlist = new cardList(data.val());

  var Router = Backbone.Router.extend({
    routes: {
      '': 'start',
      'start': 'start',
      'about': 'about',
      'card/:id/:select': 'card',
      'end/:select': 'end'
    },
    initialize: function() {
      this.startView = new startView({ model: cardlist.models[0] });
      this.aboutView = new aboutView({ model: cardlist.models[1] });
      this.cardView = [];
      this.endView = [];
      for(var i = 2; i <= 6; i++){
        if(i <= 4){
          this.cardView.push(new cardView({ model: cardlist.models[i] }));
        } else {
          this.endView.push(new endView({ model: cardlist.models[i] }));
        }
      }
    },
    start: function() {
      this.startView.render();
    },
    about: function() {
      this.aboutView.render();
    },
    card: function(id, select) {
      //每当第一个问题时，初始化countSelect
      if(id === '1'){
        this.countSelect = 0;
      }
      if(select === '1'){
        this.countSelect++;
      }
      this.cardView[id - 1].render();
    },
    end: function(select) {
      if(select === '1'){
        this.countSelect++;
      }
      //三张牌拥有任意二张就是忠实玩家
      if(this.countSelect >= 2){
        this.endView[0].render();
      } else {
        this.endView[1].render();
      }
    }
  });

  var router = new Router();
  Backbone.history.start();
});
