document.addEventListener('DOMContentLoaded', function() {
  var dDatabase = firebase.database().ref('web/views/fast_ay9_dev');

  var incrementViews = function () {
    dDatabase.once('value', function(snapshot) {
      var views = snapshot.val() || 0;
      dDatabase.set(views + 1);
    });
  };

  incrementViews();

  var currentPage = window.location.pathname;
  var subPage = currentPage.substring(currentPage.lastIndexOf('/') + 1);
  var path = 'web-views/fast_ay9_dev/home';
  var dDatabase2 = firebase.database().ref(path);

  var incrementViews2 = function () {
    dDatabase2.once('value', function(snapshot) {
      var views = snapshot.val() || 0;
      dDatabase2.set(views + 1);
    });
  };

  window.addEventListener('load', incrementViews2);
});
