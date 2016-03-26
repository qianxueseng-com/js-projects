


var myDataRef = require('./firebase'),
	data = null;




myDataRef.on("value", function succeed(snapshot){

						data = snapshot.val();
						console.log("import data from firebase sucess");
						app.start();
					}, function fail(errorObject) {
						data = require('./data');
						console.log("ilvaild firebaseData, loading from local data");
						app.start();
					});


var app = {};

app.View = Backbone.View.extend({
	el: "#warped",
	initialize: function() {
		var CardView = require('./cardView');
		var CardCollection = require('./Collection');

		var OTHER_SCARDS, QUIZ_CARDS;
		app.list = new CardCollection(data);


		OTHERS_CARDS = 3;
		QUIZ_CARDS = app.list.length-OTHERS_CARDS;
		// ---- StartView ---- //
		app.startView = new CardView({model: app.list.get('start')});

		// ---- CardView ---- //
		app.cardsViews = [];
		for (var i = 0; i< QUIZ_CARDS; i++) {
			app.cardsViews.push(new CardView({model: app.list.get(i)}));
			
		}

		// ---- FakeView ---- // 
		app.fakeView = new CardView({model: app.list.get('fake-end')});

		// ---- EndView ---- // 
		app.endView = new CardView({model: app.list.get('end')});

		
	},
	
	events: {
		'click a': "toggle"
	},

	toggle: function(event){

		this.$el.children().has($(event.target)).toggle();
	}
});


// ---- Router ---- //
app.Router = Backbone.Router.extend({
	routes: {
		''			: 'showStart',
		'start'		: 'showStart',
		"end"		: 'showEnd',
		"cards/:id"	: "showCard"
	},
	showStart: function() {
		app.startView.render();
	},
	showEnd: function() {
		var scores = app.list.calculate();

		if (scores < app.cardsViews.length/2) {
			app.list.get('fake-end').set({question: '您的得分为'+scores+ '。好吧，你居然不知道顽皮狗......！'});
			app.fakeView.render();
		} else {
			app.list.get('end').set({question: '您的得分为'+scores+ '。你还是了解顽皮狗作品的'});
			app.endView.render();
		}
	},
	showCard: function(id) {
	
		app.cardsViews[id].render();
	},

});

app.start = function() {

	new app.View();
	new app.Router();
	Backbone.history.start();
};



