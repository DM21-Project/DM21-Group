"use strict";

const vimeo_module = require('./lib/vimeo'),
    Vimeo = vimeo_module.Vimeo,
    config = require('./config'),
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET);

var util_module = require('util');

// try {
//     var config = require('./config');
// } catch (error) {
//     console.error('ERROR: For this example to run properly you must create an api app at developer.vimeo.com/apps/new and set your callback url to http://localhost:8080/oauth_callback');
//     console.error('ERROR: Once you have your app, make a copy of config.json.example named "config.json" and add your client id and client secret');
//     return;
// }

var http_module = require('http');
var url_module = require('url');

var state_data = {
    state : "unauthorized"
};

// Here we have to build the vimeo library using the client_id and client_secret
// We do not need an access token here because we will generate one
// If we already knew our access token, we can provide it as the third parameter
// var lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET);

var scopes = ['public', 'private', 'edit', 'interact'];
var callback_url = 'http://localhost:3001/oauth_callback';

// The authorization process requires the user to be redirected back to a webpage, so we can start up a simple http server here
module.exports = {

//     login: (req, res) => {
//         var url = url_module.parse(req.url, true);
//         // Once the user accepts your app, they will be redirected back to localhost:8080/oauth_callback.
//         // If they are not redirected you should check your apps configuration on developer.vimeo.com/apps
//         if (url.pathname === '/oauth_callback') {
//             if (url.query.state !== 'abcdefg') {
//                 throw new Error('invalid state');
//
//             }
//
//             if (!url.query.error) {
//                 console.log(lib.accessToken);
//                 // At this state (a request to /oauth_callback without an error parameter)
//                 // the user has been redirected back to the app and you can exchange the "code" parameter for an access token
//                 console.info('successful oauth callback request');
//                 lib.accessToken(url.query.code, callback_url, function (err, token) {
//                     if (err) {
//                         return res.end("error\n" + err);
//                     }
//
//                     if (token.access_token) {
//                         // At this state the code has been successfully exchanged for an access token
//                         lib.access_token = token.access_token;
//                         state_data.user = token.user;
//                         state_data.state = "authorized";
//                         res.statusCode = 302;
//                         res.setHeader('Location', '/');
//                         res.end();
//                     } else {
//                         throw new Error('no access token provided');
//                     }
//                 });
//             } else {
//                 // At this state (a request to /oauth_callback with an error parameter)
//                 // something went wrong when you sent your user to Vimeo.com. The error parameter should tell you more
//                 console.error('failed oauth callback request');
//                 console.error(url.query.error);
//
//                 res.setHeader('Content-Type', 'text/html');
//                 res.write('Your command line is currently unauthenticated. Please ');
//                 res.end('<a href="' + lib.buildAuthorizationEndpoint(callback_url, scopes, 'abcdefg') + '">Link with Vimeo</a><br />' + JSON.stringify(url.query));
//             }
//
//         } else {
//             if (state_data.state !== "authorized") {
//                 // At this state (any request where state_data.state has not been set to "authorized")
//                 // we do not have an authentication token, so we need to send the user to Vimeo.
//                 console.info('http request without access token');
//                 res.setHeader('Content-Type', 'text/html');
//                 res.write('Your command line is currently unauthenticated.');
//                 res.end('<a href="' + lib.buildAuthorizationEndpoint(callback_url, scopes, 'abcdefg') + '">Link with Vimeo</a>');
//             } else {
//                 // At this state (state_data.state has been set to "authorized" when we retrieved the access token)
//                 // we can make authenticated api requests
//                 console.info('http request with access token');
//                 res.setHeader('Content-Type', 'text/html');
//                 res.end('Your command line is currently authorized with the user : <a href="' + state_data.user.link + '">' + state_data.user.name + '</a>. You can make api requests via the command line using the "request" function, or upload files using the "upload" function.<br /> Try "request(\'/me\');"');
//             }
//         }
//     }
// };
};

var context = require('repl').start({}).context;

// /**
//  * This will upload the video to the authenticated account.
//  *
//  * @param  {string} path The path to the video file
//  * @param  {string} video_uri Optional. If provided, this upload will replace the source file of the video uri provided
//  */
// context.upload = function (path, video_uri) {
//     lib.streamingUpload(path, video_uri, function (err, data, status, headers) {
//         if (err) {
//             console.log('---upload error---');
//             console.log('error');
//             console.log(err);
//             console.log('response body');
//             console.log(data);
//             console.log('response status');
//             console.log(status);
//             console.log('response headers');
//             console.log(headers);
//         } else {
//             console.log('---upload success---');
//             console.log('response body');
//             console.log(data);
//             console.log('response status');
//             console.log(status);
//             console.log('response headers');
//             console.log(headers);
//         }
//     });
// };

/**
 * This method lets you make api requests.
 *
 * options.method is a string of the HTTP method for the request (GET, POST, PUT, PATCH, DELETE)
 * options.path is a string of the path portion of a url (eg. /users/dashron)
 * options.query is an object containing all of your request parameters. If GET they will be appended to the url, if POST it will be part of your request body
 * options.headers is an object containing key value pairings of all of the HTTP request headers
 *
 * @param  {Object|String} options If string, it will make a GET request to that url. If an object, you can provide many parameters. See the function description for more.
 */
context.request = function (options) {
    if (typeof options === "string") {
        options = {path : options};
    }

    lib.request(options, function (err, data, status, headers) {
        if (err) {
            console.log('---request error---');
            console.log('status');
            console.log(status);
            console.log('headers');
            console.log(headers);

            console.log('error');
            console.log(util_module.inspect(err));
        } else {
            console.log('---request success---');
            console.log('status');
            console.log(status);
            console.log('headers');
            console.log(headers);

            console.log('response');
            console.log(data);
        }
    });
};