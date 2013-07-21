(function(namespace) {

  var views = namespace.views;

  var Router = Backbone.Router.extend({

    routes: {
      '': 'login',
      'home?oauth_token=:token&oauth_verifier=:verifier': 'home'
    },

    initialize: function(){

    },

    home: function(token,verifier){
      console.log(token,verifier);
      new views.Home({
        el: $('#container')
      });
    },

    login: function(){
      new views.Login({
        el: $('#container')
      });
    }

  });

  new Router();

})(root);