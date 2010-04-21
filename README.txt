/// WebOS OAuth \\\

This Files where downloaded from http://github.com/fillito/WebOS-OAuth

By: Daniel García (fillito)
E-Mail: fillito@gmail.com
Web: www.fillito.com
Madrid - Spain

Description : 
------------

    This is just a small library for making OAuth Authentications in Palm WebOS. 
You just have to instantiate it passing a json object with the complete OAuth configurations (requestToken Url, authorize Url, accessToken Url, consumer_key, consumer_key_secret) and push it as a normal Mojo Scene. 

The application MUST be configured as a web-application on the server side (non client application).
This library captures the callback redirect url to get the final token to complete the authentication. 



Installation :
-------------

1.  Simple copy and paste All files except the sources.json into your WebOS Application folder. 
2.  Open your application's sources.json file and paste the content of the sources.json included in this library

	 {"source": "app/assistants/utils/oauth.js"},
   	 {
        	"scenes": "oauth",
	        "source": "app/assistants/oauth-assistant.js"
	 },
	 {
        	"scenes": "oauthbrowser",
	        "source": "app/assistants/oauthbrowser-assistant.js"
    	 } 

     So your application can access the library files

3. Simple set up a json object containing the configuration data as shown here and push the oauth Scene

	var oauthConfig={
		requestTokenUrl:'http:// -domain- /oauth/request_token',
		authorizeUrl:'http:// -domain- /oauth/authorize',
		accessTokenUrl:'http:// -domain- /oauth/access_token',
		consumer_key:' -your consumer key- ',
		consumer_key_secret:' -your consumer key secret- '
	 };
	 Mojo.Controller.stageController.pushScene('oauth',oauthConfig);	
	

Web App Configuration :
----------------------

This library does a little tricky hack so you can make an OAuth Authentication for any OAuth API. 
Some OAuth API offers two types of application authentication : web app & client app.
Clients App type returns a PIN code that you can use as authentication token, but not all API offers this method. 

This library enable OAuth on WebOS ONLY for Web App type Authentication. If you know a little bit about OAuth, you will realise that web app type needs a Callback URL to return the oauth token as a GET parameter. The trick this library uses, is to capture this token as the server redirects. 

To enable this, the only thing you have to take into account, is to configure your application (registered to access the API) callback URL to redirect to www.google.com.  <----- IMPORTANT !!!!

This library listen the embedded web browser to be redirected to www.google.com/?oauth_token=******* , so you MUST set it so it works.

- Contact me if you have dubts about it -


Comments : 
---------

This is just the first version of this library. Please, contact me if you need anything related to this library or you want to make any suggestion for improve it.

Thanks for download !!
Fork me at GitHub !!  http://github.com/fillito/WebOS-OAuth


