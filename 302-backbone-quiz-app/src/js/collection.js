'use strict'

import { card } from './model';

var cardList = Backbone.Collection.extend({
  model: card
});

export { cardList };
