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
      console.log('connecting...')
      //default event wont trigger
      e.preventDefault();

      //Cheked with twitter dev api
      var myConsumerKey = $('#consumerKey').val();
      var myConsumerSecret = $('#consumerSecretKey').val();

      //for oauth instance
      var config = {
        callbackUrl: 'http://localhost:9300/#oauth',
        consumerKey: myConsumerKey,
        consumerSecret: myConsumerSecret
      };

      //create oauth instance
      var oauth = new OAuth(config);

      //Test -  this should not trigger, because the callback Url

      function success(data) {
        console.log('finish', data);
        // open the windo to accept form
        window.open('https://twitter.com/oauth/authorize?' + data.text );
      }

      //fails

      function failure(data) {
        console.log('Alert!!... something went wrong', data);
      }

      //Optios for the oauth
      var options = {
        method: 'POST',
        url: 'https://api.twitter.com/oauth/request_token',
        success: success,
        failure: failure,
        headers: {
          'oauth_nonce': 'f050b86ed6389ce2b06595fe17060a50',
          // 'oauth_callback': 'http%3A%2F%2F127.0.0.1%3A9300%2F%23home',
          'oauth_signature_method': 'HMAC-SHA1',
          'oauth_timestamp': '1374428822',
          'oauth_consumer_key': myConsumerKey,
          'oauth_signature': 'O5ZOVSosgWNRC7HOI4eAIRLTREY%3D',
          'oauth_version': '1.0'
        }
      };

      oauth.request(options);
    }

  });

  views.Oauth = Bb.View.extend({
    template: getTemplate('oauth'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template());
      return me;
    }
  });

})(root);