'use strict'

var config = require('../models/config')
var skill = require('../index').skill
var respond = require('./respond')
var utils = require('./utils')
var https = require('https');

function processUtterance ( intent, session, request, responseFn, utterance ) {

  utterance = ( utterance || '' ).toLowerCase()

  if (utterance === 'save the hacker'){
    var options = {
      host: 'cbsw88isjl.execute-api.us-west-2.amazonaws.com',
      path: '/prod/spark-create-blog',
      method: 'POST'
    };
    var projectName = 'save the hacker';

    var req = https.request(options, function (res) {

      console.log('Invoking lambda to get URL');
      var response = '';


      res.on('data', function (d) {
        response += d;
        console.log('Response from lambda:', response);

      });

      res.on('end', function () {
        var url = JSON.parse(response).url;

        updateSlack(url, projectName, function (res) {
          proceedAfterResponse(intent, session, request, responseFn, utterance);
        });
      });

    });
    var data = {action:"create-website",value:projectName};
    req.write('create-website,'+projectName);
    console.log(JSON.stringify(data));
    req.end();
    req.on('error', function (e) {
      console.error(e);
    });
  }
  else if (utterance === 'women who code'){
    var options = {
      host: 'cbsw88isjl.execute-api.us-west-2.amazonaws.com',
      path: '/prod/spark-create-blog',
      method: 'POST'
    };
    var projectName = 'women who code';

    var req = https.request(options, function (res) {

      console.log('Invoking lambda to get URL');
      var response = '';


      res.on('data', function (d) {
        response += d;
        console.log('Response from lambda:', response)
      });

      res.on('end', function () {
        var url = JSON.parse(response).url;

        updateSlack(url, projectName, function (response) {
          proceedAfterResponse(intent, session, request, responseFn, utterance);
        });
      });

    });
    var data = {action:"create-website",value:projectName};
    req.write('create-website,'+projectName);
    console.log(JSON.stringify(data));
    req.end();
    req.on('error', function (e) {
      console.error(e);
    });
  }

  else if (utterance === 'add background'){
    var img = 'savethehacker1';
    var options = {
      host: 'cbsw88isjl.execute-api.us-west-2.amazonaws.com',
      path: '/prod/spark-create-blog',
      method: 'POST'
    };

    var req = https.request(options, function (res) {

      console.log('Invoking lambda to change background');
      var response = '';

      res.on('data', function (d) {
        response += d;
        console.log('Response from lambda:', response);
        proceedAfterResponse(intent, session, request, responseFn, utterance);
      });

    });
    var data = 'change-background,'+img;
    req.end(data);
    req.on('error', function (e) {
      console.error(e);
    });

  }

  else if (utterance === 'no i dont like the background'){
    var img = 'savethehacker2';
    var options = {
      host: 'cbsw88isjl.execute-api.us-west-2.amazonaws.com',
      path: '/prod/spark-create-blog',
      method: 'POST'
    };

    var req = https.request(options, function (res) {

      console.log('Invoking lambda to change background');
      var response = '';

      res.on('data', function (d) {
        response += d;
        console.log('Response from lambda:', response);
        proceedAfterResponse(intent, session, request, responseFn, utterance);
      });

    });
    var data = 'change-background,'+img;
    req.end(data);
    req.on('error', function (e) {
      console.error(e);
    });

  }

  else if(utterance === 'add border'){
    var border = 'solid';
    var options = {
      host: 'cbsw88isjl.execute-api.us-west-2.amazonaws.com',
      path: '/prod/spark-create-blog',
      method: 'POST'
    };

    var req = https.request(options, function (res) {

      console.log('Invoking lambda to change website border');
      var response = '';

      res.on('data', function (d) {
        response += d;
        proceedAfterResponse(intent, session, request, responseFn, utterance);
      });

    });
    var data = 'change-border,'+border;
    req.end(data);
    req.on('error', function (e) {
      console.error(e);
    });
  }

  else if(utterance === 'no i dont like the border'){
    var border = 'none';
    var options = {
      host: 'cbsw88isjl.execute-api.us-west-2.amazonaws.com',
      path: '/prod/spark-create-blog',
      method: 'POST'
    };

    var req = https.request(options, function (res) {

      console.log('Invoking lambda to change website border');
      var response = '';

      res.on('data', function (d) {
        response += d;
        proceedAfterResponse(intent, session, request, responseFn, utterance);
      });

    });
    var data = 'change-border,'+border;
    req.end(data);
    req.on('error', function (e) {
      console.error(e);
    });
  } else {
    proceedAfterResponse(intent, session, request, responseFn, utterance);
  }

}

function proceedAfterResponse(intent, session, request, response, utterance) {
  var intentHandlers = skill.intentHandlers

  Object.keys( config.commands ).forEach( function ( intentName ) {
    if ( utils.getCommandsForIntent( intentName) .indexOf( utterance ) > -1 ) {
      intentHandlers[ intentName ]( intent, session, request, response )
      return // exit
    }
  });

  var currentScene = utils.findResponseBySceneId( session.attributes.currentSceneId )

  if (!currentScene || !currentScene.options) {
    intentHandlers["LaunchIntent"](intent, session, request, response)
    return
  }

  // incase this scene uses the previous scenes options
  if ( currentScene.readPreviousOptions ) {
    var previousSceneId = session.attributes.breadcrumbs[ session.attributes.breadcrumbs.length -1 ]
    currentScene = utils.findResponseBySceneId( previousSceneId )
  }

  var option = currentScene.options.find( function ( option ) {
    return ( option.utterances.indexOf( utterance ) > -1 )
  })

  // option found
  if ( option ) {
    var nextScene = utils.findNextScene( currentScene, option );
    session.attributes.breadcrumbs.push( currentScene.id )
    session.attributes.currentSceneId = nextScene.id
    respond.readSceneWithCard( nextScene, session, response )
  }

  // no match
  else {
    intentHandlers.UnrecognizedIntent( intent, session, request, response )
  }
}

function updateSlack(url, projectName, callback) {
  var options = {
    host: 'hooks.slack.com',
    path: '/services/T04N70K4J/B59FXUYS1/wO1EBlyrQVHYxfXQTELa5hc9',
    method: 'POST'
  };

  var req = https.request(options, function (res) {

    console.log('Sending url to slack');
    var body = '';

    res.on('data', function (d) {
      body += d;
      console.log('Response from slack:', body)
    });

    res.on('end', function () {
      callback(url);
    });
  });
  var payload='{"channel": "#spark-alexa-test", "username": "pairingbot", "text": " URL for '+projectName+' is '+url+'"}';
  req.write(payload);
  req.end();
  req.on('error', function (e) {
    console.error(e);
  });

}


module.exports = processUtterance
