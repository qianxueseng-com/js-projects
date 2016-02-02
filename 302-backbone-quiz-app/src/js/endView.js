'use strict'

var endView = Backbone.View.extend({
  el: $('#container'),
  initialize: function(){
    this.template = _.template($("#end-template").html());
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});

export { endView };
