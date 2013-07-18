(function(namespace) {

  var views = namespace.views;

  var Router = Backbone.Router.extend({
    
    routes: {
      '': 'login'
    },

    initialize: function(){

    },

    login: function(){
      new views.Login({
        el: $('#container')
      });
    }

  });

  new Router();

})(root);