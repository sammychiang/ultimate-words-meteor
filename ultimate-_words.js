Words = new Mongo.Collection("words");

if (Meteor.isClient) {


}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    Meteor.methods({
      upload_word: function(word) {
        check(word, String);
        Words.upsert({
          word: word
        }, {
          $set: {
            lastShowTime: Date.now()
          },
          $inc: {
            counts: 1
          }
        });
        result = {
          totalWordsNum: Words.find().count()
        };
        console.log(result);
        return result;
      }
    })
  });
}
