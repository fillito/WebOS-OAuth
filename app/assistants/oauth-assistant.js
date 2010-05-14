function OauthAssistant(oauthConfig) {
    this.message=null;
    this.accessor=null;
    this.authHeader=null;
    this.method=null;
    this.oauth_verifier=null;
    this.requestTokenUrl=oauthConfig.requestTokenUrl;
    this.authorizeUrl=oauthConfig.authorizeUrl;
    this.accessTokenUrl=oauthConfig.accessTokenUrl;
    this.consumer_key=oauthConfig.consumer_key;
    this.consumer_key_secret=oauthConfig.consumer_key_secret;
    if(oauthConfig.callback!=undefined)
	this.callback=oauthConfig.callback;
    else
	this.callback='oob';
    if(oauthConfig.requestTokenMethod!=undefined)
	this.requestTokenMethod=oauthConfig.requestTokenMethod;
    else
	this.requestTokenMethod='GET';
    if(oauthConfig.accessTokenMethod!=undefined)
	this.accessTokenMethod=oauthConfig.accessTokenMethod;
    else
	this.accessTokenMethod='GET';
    this.url='';
    this.requested_token='';
}
OauthAssistant.prototype.setup = function() {
    this.requestToken();
}

OauthAssistant.prototype.activate = function(event) {
    var paramType=typeof event;
    if(paramType=='string'){
	result=event.match(/oauth_token=*/g);
	if(result!=null){
	    var responseVars=event.split("&");
	    var token=responseVars[0].replace("oauth_token=","");	    
	    this.oauth_verifier=responseVars[1].replace("oauth_verifier=","");	    
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
    this.message.parameters.push(['oauth_nonce',nonce]);
    this.message.parameters.push(['oauth_signature_method','HMAC-SHA1']);
    this.message.parameters.push(['oauth_timestamp',timestamp]);
    if(this.token!=null)
	this.message.parameters.push(['oauth_token',this.token]);
    this.message.parameters.push(['oauth_version','1.0']);
    this.message.parameters.sort()
    OAuth.SignatureMethod.sign(this.message, this.accessor);
    this.authHeader=OAuth.getAuthorizationHeader("", this.message.parameters);
    return true;
}
OauthAssistant.prototype.requestToken = function (){
    this.url=this.requestTokenUrl;
    this.method=this.requestTokenMethod;
    this.signHeader("oauth_callback="+this.callback);
    new Ajax.Request(this.url,{
	method: this.method,
	encoding: 'UTF-8',
	requestHeaders:['Authorization',this.authHeader],
	onComplete:function(response){
	    var response_text=response.responseText;
	    var responseVars=response_text.split("&");
	    var auth_url=this.authorizeUrl+"?"+responseVars[0]+"&oauth_consumer="+this.consumer_key;
	    var oauth_token=responseVars[0].replace("oauth_token=","");
	    var oauth_token_secret=responseVars[1].replace("oauth_token_secret=","");
	    this.requested_token=oauth_token;
	    this.token=this.requested_token;
	    this.tokenSecret=oauth_token_secret;
	    var oauthBrowserParams={
		authUrl:auth_url,
		callbackUrl:this.callback
	    }	    
	    Mojo.Controller.stageController.pushScene({name:"oauthbrowser",transition:Mojo.Transition.none},oauthBrowserParams);
	}.bind(this)
    });
}
OauthAssistant.prototype.exchangeToken = function (token){
    this.url=this.accessTokenUrl;    
    this.token=token;
    this.method=this.accessTokenMethod;
    this.signHeader("oauth_verifier="+this.oauth_verifier);
    new Ajax.Request(this.url,{
	method: this.method,
	encoding: 'UTF-8',
	requestHeaders:['Authorization',this.authHeader],
	onComplete:function(response){
	    
	}.bind(this)
    });
}

