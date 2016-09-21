'use strict'

var card = Backbone.Model.extend({
  defaults: {
    question: "",
    imageURL: "",
    answerA: "",
    answerB: ""
  }
});

export { card };
