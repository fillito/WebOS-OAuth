/// WebOS OAuth \\\

This Files where donwloaded from http://github.com/fillito/WebOS-OAuth

By: Daniel García (fillito)
E-Mail: fillito@gmail.com
Web: www.fillito.com
Madrid - Spain

Description : 
------------

    This is just a small librarly for making OAuth Authentications in Palm WebOS. 
You just have to instantiate it passing a json object with the complete OAuth configurations (requestToken Url, authorize Url, accessToken Url, consumer_key, consumer_key_secret) and push it as a normal Mojo Scene. 

The application MUST be configured as a web-aplication on the server side (non client application).
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
	


Comments : 
---------

This is just the first version of this library. Please, contact me if you need anything related to this library or you want to make any suggestion for improve it.

Thanks for download !!
Fork me at GitHub !!  http://github.com/fillito/WebOS-OAuth


