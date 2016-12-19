const builder = require("botbuilder");


//the thing that you're talking to.  In this case the console.
const connector = new builder.ConsoleConnector();
//the bot.
const bot = new builder.UniversalBot(connector);

const dialog = new builder.IntentDialog()
  .matches(/^load$/i, [
    (session) => {
      builder.Prompts.text(session, "Please enter the name");
    },
    (session, results) => {
      session.endConversation(`You're looking for ${results.response}`);
    }])
  .onDefault((session) => {
    session.endConversation("Hi there! I'm a GitHub bot. I can load user profile information if you send the command **load**.");
  });



bot.dialog("/", dialog);


//Name of Dialog, Redirect to Dialog, Conditions for Dialog Trigger
bot.beginDialogAction("help", "/help", {matches: /^help/});
bot.dialog("/help", [
  (session) => {
    session.endDialog("This bot allows you to load gh data.");
  }
]);

connector.listen();
