function OauthbrowserAssistant(URL) {
    this.storyURL = URL;
}
OauthbrowserAssistant.prototype.setup = function() {
    this.controller.setupWidget("browser", {url: this.storyURL}, this.storyViewModel = {});
    Mojo.Event.listen(this.controller.get('browser'), Mojo.Event.webViewTitleUrlChanged, this.titleChanged.bind(this));
}
OauthbrowserAssistant.prototype.titleChanged = function(event) {
    var callbackUrl=event.url;
    var responseVars=callbackUrl.split("?");
    if(responseVars[0]=='http://www.google.com/' || responseVars[0]=='http://www.google.com'){
	// Correct return url (hacked using google.com as callback url)
	var token=responseVars[1].replace("oauth_token=","");
	//Mojo.Controller.stageController.popSceneTo('oauth',responseVars[1]);
	this.controller.stageController.popScenesTo('oauth',responseVars[1]);
    }
}
OauthbrowserAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


OauthbrowserAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

OauthbrowserAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
    //Mojo.Event.stopListening(this.controller.get('browser'), Mojo.Event.webViewTitleUrlChanged, this.titleChanged.bind(this));
}