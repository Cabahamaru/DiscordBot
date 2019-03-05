var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
var currentanime;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	var msg = message.content;
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        switch(cmd) {
            // !ping
            case 'ping': 
				if (channelID != 533340984109563914) {
					bot.sendMessage({
						to: channelID,
						message: 'Les comandes van a #kamigame'
					});
					break;
				}
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
			break;
			// !setanime
			case 'setanime':
				if (channelID != 533340984109563914) {
					bot.sendMessage({
						to: channelID,
						message: 'Les comandes van a #kamigame'
					});
					break;
				}
				if (userID == 219591005236625408) {
					currentanime = args[1]
					bot.sendMessage({
						to: channelID,
						message: 'Nou anime actualitzat (!anime per veure)'+' '+channelID
					});
				}
				else {
					bot.sendMessage({
						to: channelID,
						message: 'No tens permisos :('
					});
				}
            break;
			case 'anime':
				if (channelID != 533340984109563914) {
					bot.sendMessage({
						to: channelID,
						message: 'Les comandes van a #kamigame'
					});
					break;
				}
                bot.sendMessage({
                    to: channelID,
                    message: 'Anime actual: '+currentanime
                });
            break;
			case 'punts':
				if (channelID != 533340984109563914) {
					bot.sendMessage({
						to: channelID,
						message: 'Les comandes van a #kamigame'
					});
					break;
				}
				currentanime = args[1]
                bot.sendMessage({
                    to: channelID,
                    message: user+' tens '+userData[userID].messageSent+' punt(s)'
                });
            break;
            default:
				if (channelID != 533340984109563914) {
					bot.sendMessage({
						to: channelID,
						message: 'Les comandes van a #kamigame'
					});
					break;
				}
                bot.sendMessage({
                    to: channelID,
                    message: 'No existeix la comanda'
                });
         }
     }

    if(!userData[userID]) userData[userID] = {
        messageSent : 0
    }

    userData[userID].messageSent++;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) =>{
        if(err) console.error(err);
    });
});