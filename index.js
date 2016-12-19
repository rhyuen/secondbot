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

server.post("/api/messages", connector.listen());

bot.dialog("/", (session) => {
  session.send("Hello, Thank you for taking the time.");
});
