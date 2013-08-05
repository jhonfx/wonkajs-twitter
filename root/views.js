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
      me.connec();
    },

    render: function() {
      var me = this;
      me.$el.html(me.template());
      return me;
    },

    connec: function() {
      var me = this;
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

      //success
      function success(data) {
        console.log('success, ready for authorize');
        me.changeButton('primary', 'https://twitter.com/oauth/authorize?' + data.text, 'Authorize twitter app');
      };

      //fails
      function failure(data) {
        console.log('fail, give feedback');
        me.changeButton('danger', '', 'Unauthorized request');
      };

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
    },

    events: {
      'submit .form-api-keys': 'checkKeys'
    },

    checkKeys: function(event) {
      event.preventDefault();
      var me = this;
      me.changeButton('inverse','', 'Verifying the apps keys...');
      me.connec();
    },

    changeButton: function(btn_class, href, msg) {
      var btn = $('.twitter-oauth-button');
      (btn.hasClass('btn-inverse')) ? btn.removeClass('btn-inverse') : btn.removeClass('btn-danger') ;
      btn.addClass('btn-' + btn_class);
      btn.attr('href', href);
      btn.html(msg);
    },

  });

  views.Oauth = Bb.View.extend({
    template: getTemplate('oauth'),
    initialize: function() {
      this.oauth = window.getParams();
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