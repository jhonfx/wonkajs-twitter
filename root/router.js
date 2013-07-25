(function(namespace) {

  var views = namespace.views;

  var Router = Backbone.Router.extend({

    routes: {
      '': 'login',
      // 'oauth?oauth_token=:token&oauth_verifier=:verifier': 'oauth'
      'oauth?*': 'oauth'
    },

    initialize: function(){

    },

    oauth: function(){
      new views.Oauth({
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