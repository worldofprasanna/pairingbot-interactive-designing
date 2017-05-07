var processUtterance = require('./processUtterance')

module.exports = {
	"ResetStateIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "reset skill" )
	},
	"RestoreStateIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "resume skill" )
	},
	"RepeatOptionsIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "repeat options" )
	},
	"RepeatSceneIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "repeat scene" )
	},
	"GoBackIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "go back" )
	},
	"AMAZON.HelpIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "help" )
	},
	"AMAZON.StopIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "exit skill" )
	},
	"AMAZON.CancelIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "exit skill" )
	},
	"BeginIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "begin" )
	},
	"SaveTheHackerIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "save the hacker" )
	},
	"WomenWhoCodeIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "women who code" )
	},
	"OkIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "ok" )
	},
	"AddBackgroundIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "add background" )
	},
	"AddBorderIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "add border" )
	},
	"YesILikeTheBackgroundIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "yes i like the background" )
	},
	"NoIDontLikeTheBackgroundIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "no i dont like the background" )
	},
	"YesILikeTheBorderIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "yes i like the border" )
	},
	"NoIDontLikeTheBorderIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "no i dont like the border" )
	},
	"ExitSkillIntent": function ( intent, session, request, response ) {
		processUtterance( intent, session, request, response, "exit skill" )
	},
}