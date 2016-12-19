const restify = require("restify");
const builder = require("botbuilder");

const server = restify.createServer();
server.listen(process.env.PORT || process.env.port || 3978, () => {
  console.log("[%s]: %s listening to %s", new Date().toLocaleString(), server.name, server.url);
});

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID || null,
  appPassword: process.env.MICROSOFT_APP_PASSWORD || null
});
var bot = new builder.UniversalBot(connector);

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

server.post("/api/messages", connector.listen());

bot.dialog("/", dialog);

bot.beginDialogAction("help", "/help", {matches: /^help/});
bot.dialog("/help", [
  (session) => {
    session.endDialog("This bot allows you to load gh data.");
  }
]);
