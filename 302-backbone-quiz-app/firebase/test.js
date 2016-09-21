var myFirebaseRef = new Firebase("https://shining-heat-1411.firebaseio.com");
myFirebaseRef.on("value", function(snapshot) {
  console.log(snapshot.val());
});
