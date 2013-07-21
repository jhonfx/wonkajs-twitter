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
      var consumerKey = $('#consumerKey').val();
      var accessTokenKey = $('#accessTokenKey').val();

      //for oauth instance
      var config = {
        callbackUrl: 'http://localhost:9300/home'
      };

      //create oauth instance
      var oauth = OAuth(config);

      //Test -  this should not trigger, because the callback Url
      function success(data) {
        console.log('finish');
      }

      //fails
      function failure(data) {
        console.log('Alert!!... something went wrong');
      }

      //Optios for the oauth
      var options = {
        method: 'POST',
        url: 'https://api.twitter.com/oauth/request_token',
        success: success,
        failure: failure,
        headers: {
          'oauth_consumer_key': consumerKey,
          'oauth_nonce': "be4e06145df48aa50156e379b3816944",
          'oauth_signature': "s4Q4Q76MCP8wSuqvSLA3G2pRLXY%3D",
          'oauth_signature_method': "HMAC-SHA1",
          'oauth_timestamp': "1374382575",
          'oauth_token': accessTokenKey,
          'oauth_version': "1.0"
        }
      };

      oauth.request(options);

    }
  });

})(root);