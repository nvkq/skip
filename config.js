var config = {
  apiKey: "AIzaSyDv_5LQG1c14V6qvsTy-8kdLA4xkEkhQ4s",
  authDomain: "all-apps-by-alharthy.firebaseapp.com",
  databaseURL: "https://all-apps-by-alharthy.firebaseio.com",
  projectId: "all-apps-by-alharthy",
  storageBucket: "all-apps-by-alharthy.appspot.com",
  messagingSenderId: "550126760230",
  appId: "1:550126760230:web:09f8702f59e080da5451e7",
  measurementId: "G-KDR2DW0WP5"
};

firebase.initializeApp(config);

document.addEventListener('DOMContentLoaded', function() {
  var dViews = document.querySelector('.CountViews');
  var dCounter = dViews.querySelector('.counterStat');
  var dDatabase = firebase.database().ref('web/views/https://nvkq.github.io/skip/');

  dDatabase.on('value', function (snap) {
    var data = snap.val() || 0;
    dCounter.textContent = data;
  });

  /*var incrementViews = function () {
    dDatabase.once('value', function(snapshot) {
      var views = snapshot.val() || 0;
      dDatabase.set(views + 1);
    });
  };*/

  //window.addEventListener('load', incrementViews);
});
