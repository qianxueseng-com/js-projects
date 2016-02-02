'use strict'

var aboutView = Backbone.View.extend({
  el: $('#container'),
  initialize: function(){
    this.template = _.template($("#about-template").html());
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});

export { aboutView };
