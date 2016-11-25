let Card = Backbone.Model.extend({
    defaults: {
        imageURL: '',
        question: '',
        answerA : '',
        answerB : ''
    }
});

export default Card;
