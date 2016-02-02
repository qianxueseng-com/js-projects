'use strict'

var cardView = Backbone.View.extend({
  el: $('#container'),
  initialize: function(){
    this.template = _.template($("#card-template").html());
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});

export { cardView };
