(function(namespace) {

  var models = namespace.models;
  var collections = namespace.collections;
  var views = namespace.views;

  var getTemplate = function(name) {
    return hbs.compile($('#root-' + name + '-template').html());
  }

  views.Login = Bb.View.extend({
    template: getTemplate('login'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template());
      return me;
    },
    events: {
      'submit .form-signin': 'login'
    },
    login: function(e) {
      //default event wont trigger
      e.preventDefault();

    }
  });

})(root);