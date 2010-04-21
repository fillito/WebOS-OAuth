function OauthAssistant(oauthConfig) {
    this.message=null;
    this.accessor=null;
    this.authHeader=null;
    this.method=null;
    this.requestTokenUrl=oauthConfig.requestTokenUrl;
    this.authorizeUrl=oauthConfig.authorizeUrl;
    this.accessTokenUrl=oauthConfig.accessTokenUrl;
    this.consumer_key=oauthConfig.consumer_key;
    this.consumer_key_secret=oauthConfig.consumer_key_secret;
    this.url='';
    this.requested_token='';
    this.appCallback=oauthConfig.appCallback;
}
OauthAssistant.prototype.setup = function() {
    this.requestToken();
}

OauthAssistant.prototype.activate = function(event) {
    var paramType=typeof event;
    if(paramType=='string'){
	result=event.match(/oauth_token=*/g);
	if(result!=null){
	    var token=event.replace("oauth_token=","");
	    this.exchangeToken(token);
	}
    }
}

OauthAssistant.prototype.deactivate = function(event) {
	
}

OauthAssistant.prototype.cleanup = function(event) {

}
OauthAssistant.prototype.signHeader = function (params){
    if(params==undefined)
	    params='';
    if(this.method==undefined)
	    this.method='GET';
    var timestamp=OAuth.timestamp();
    var nonce=OAuth.nonce(11);
    this.accessor = {consumerSecret: this.consumer_key_secret, tokenSecret : this.tokenSecret};
    this.message = {method: this.method, action: this.url, parameters: OAuth.decodeForm(params)};
    this.message.parameters.push(['oauth_consumer_key',this.consumer_key]);
    this.message.parameters.push(['oauth_token',this.token]);
    this.message.parameters.push(['oauth_nonce',nonce]);
    this.message.parameters.push(['oauth_timestamp',timestamp]);
    this.message.parameters.push(['oauth_signature_method','HMAC-SHA1']);
    this.message.parameters.push(['oauth_version','1.0']);
    OAuth.SignatureMethod.sign(this.message, this.accessor);
    this.authHeader=OAuth.getAuthorizationHeader("", this.message.parameters);
    return true;
}
OauthAssistant.prototype.requestToken = function (){
    this.url=this.requestTokenUrl;
    this.method='GET';
    this.signHeader();
    new Ajax.Request(this.url,{
	method: this.method,
	encoding: 'UTF-8',
	requestHeaders:['Authorization',this.authHeader],
	onComplete:function(response){
	    var response_text=response.responseText;
	    var responseVars=response_text.split("&");
	    var auth_url=this.authorizeUrl+"?"+responseVars[0];
	    var oauth_token=responseVars[0].replace("oauth_token=","");
	    var oauth_token_secret=responseVars[1].replace("oauth_token_secret=","");
	    this.requested_token=oauth_token;
	    this.token=this.requested_token;
	    this.tokenSecret=oauth_token_secret;
	    Mojo.Controller.stageController.pushScene("oauthbrowser",auth_url);
	}.bind(this)
    });
}
OauthAssistant.prototype.exchangeToken = function (token){
    this.url=this.accessTokenUrl;
    this.method='POST';
    this.signHeader("oauth_verifier="+token);
    new Ajax.Request(this.url,{
	method: this.method,
	encoding: 'UTF-8',
	requestHeaders:['Authorization',this.authHeader],
	onComplete:function(response){
	    // Here, you should do something with the response content
	}.bind(this)
    });
}

