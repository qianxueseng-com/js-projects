'use strict'

var startView = Backbone.View.extend({
  el: $('#container'),
  initialize: function(){
    this.template = _.template($("#start-template").html());
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});

export { startView };
