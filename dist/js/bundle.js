"use strict";angular.module("vimeoApp",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"views/home.html",controller:"mainCtrl"})}]),angular.module("vimeoApp").controller("mainCtrl",["$scope",function(e){}]),angular.module("vimeoApp").directive("footerDir",function(){return{restrict:"AE",templateUrl:"./views/footerDir.html"}}),angular.module("vimeoApp").directive("navBar",function(){return{restrict:"E",templateUrl:"./views/navBar.html",link:function(e){}}}),angular.module("vimeoApp").service("mainService",["$http",function(e){var t="http://localhost:3001";this.searchVideos=function(){return e({method:"GET",url:t+"/api/videos/"})},this.getVideoById=function(r){return e({method:"GET",url:t+"/api/videos/"+r})},this.getComments=function(r){return e({method:"GET",url:t+"/api/videos/"+r+"/comments"})},this.postComment=function(r){return e({method:"POST",data:"",url:t+"/api/comments/"+r})}}]);
//# sourceMappingURL=bundle.js.map
