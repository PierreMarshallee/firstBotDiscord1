const Discord = require("discord.js");

const Client = new Discord.Client;

const préfix = "&";

Client.on("ready", () => {//1
    console.log("bot opérationnel");

    Client.guilds.cache.find(guild => guild.id === "810843926432317440").channels.cache.find(
        channel => channel.id === "810843926432317444").messages.fetch("862075858322718742").then(
            message => {
                console.log("Message ajoté à la mémoire : " + message.content)}).catch(err => {
                    console.log("Impossible d'ajouter le message à la mémoire : " + err);
                });//9
});

Client.on("guildMemberAdd", member => {//5
    member.guild.channels.cache.find(channel => channel.id === "810843926432317444")//4
        .send(member.displayName +"est arrivé !\nNous sommes désormais**"
        +member.guild.memberCount +"**sur le serveur");
    member.roles.add("861606193889804319").then(succès => {//6
        console.log("Rôle attribué avec succès pour" + succès.displayName);
    }).catch(() => {
        console.log("Le rôlen'a pas pu être attribué");
    }
)});

Client.on("guildMemberRemove", member => {
    member.guild.channels.cache.find(channel => channel.id === "810843926432317444")
    .send(member.displayName +"a quitté le serveur.");
});

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;
    console.log("Réaction ajouté par: " + user.username + 
    "\nNom de l'émoji" + reaction.emoji.name + "c'est la" + reaction.count + " e réaction" );

    //reaction.remove().then(reaction => {
       // console.log("réaction" + reaction.emoji.name + "a été retiré");}).catch(err => {
            //console.log("Impossible de retirer la réaction : " + err)});

             //reaction.users.remove(User.id).then(reaction => {
       // console.log("réaction" + reaction.emoji.name + "a été retiré");}).catch(err => {
            //console.log("Impossible de retirer la réaction : " + err)});
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log("Réaction retiré");
});

Client.on("message", message => {//2
    if (message.author.bot) return;//3
    if (message.channel.type == "dm") return;

    message.react("😁");//7
    message.react("862072925095067699");//8

    if (message.content == préfix + "ping") {
        message.channel.send("pong");
    }

    if (message.content == préfix + "stat") {
        message.channel.send("Infos de **"+ message.author.username +
        "** :\n" +"Tag : __" + message.author.tag+ "__\n" + "Identifiant : __" +
         message.author.id + "__ " );
    }
});

Client.login(process.env.TOKEN);






//                  ==========================================================
//1 Quand le client recevra l'évènement ready il fera la fct donc quand le bot sera connecté
//2 Quand le Client recevra l'évènement message il vas faire la fct avec la variable message donc
//Quand le bot détecte un message il va effectuer la fct avec la variable message.
//3 Quand le message est envoyé par un bot il ne lis pas la suite du code.
//On prend le membre(member) et dans quel serveur il est(guild) puis on va prendre la liste des
//salons du serveur(channels.cache) et envoyer le message dans le salon 
//avec l'identifiant du salon dans lequel on veut que le message soit.
//(find(channel => channel.id === "810843926432317444");).
//5 member est une variable qui stock tt les infos sur le membre qui est arrivés/partis ou sur
//en bref cette variable stock les infos sur l'évènement qui c'est passé avant.
//6 si il arrive a mettre le rôle il va effectuer le then si pas il va faire le catch,ce qui 
//de pas faire crasher le bot.
//7Aller sur emojikeyboard.top pour copié et coller des émoji.
//8Pour que le bot réagisse avec des émojis personalisé du serveur il faut d'abord envoyé cet
//émoji spécial sur le serveur, puis copié le lie et le mettre là où on envois un message. Il
//ne faut pas l'envoyer et copié le nombre qui a après le émojis/.
//9Permet d'obtenir le serveur "Client.guilds.cache.find(guild => guild.id ===
//"810843926432317440")" puis "channels.cache.find(channel => channel.id === 
//"810843926432317444")" qui permet de trouver le salon pui on à le 
//messages.fetch("862075858322718742") qui permet de mettre en mémoire le bon message puis nous
//le then et le catch pour dire si ça a été fait avec succès.Donc on veux prendre le message et 
//le mettre dans la mémoire du bot car le bot ne peux réagir que avec les messages qu'il a en 
//mémoire. Les message qu'il a en mémoire sont les messages qui ont été envoyé depuis que le 
//bot est la avec cette fonctionnalité. Mais dc cette technique c'est pour qu'il puisse 
//interagir avec tout les ancien messages, ce qui est inutile et e plus il faudrais copié
//collé tout les identifiants des anciens messages. DOnc cette fonctionnalités est nulle. 