var $ = require('jquery');
// TODO:
//
//
//
$(document).ready( function (){
var usersFcc = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var twitchUsers = 'https://api.twitch.tv/kraken/users/';
var twitchStream = 'https://api.twitch.tv/kraken/streams/';
var html = '';
var streamData = '';
var status = '';
// Recuperto le immagini
var usersFccImg = [];
for (var i = 0; i < usersFcc.length; i++){
  $.ajax({
    url: twitchUsers + usersFcc[i],
    async: false,
    success: function (data) {
      usersFccImg.push(data.logo);
      }
    });
}
// Recupero i dati di streaming
for (var i = 0; i < usersFcc.length; i++){
    $.ajax({
      url:twitchStream + usersFcc[i],
      async: false,
      success: function(data)
      {
        streamData = '';
        if (data.stream !== null) {
          streamData += data.stream.game + ': ';
          streamData += data.stream.channel.status;
          status = "online";
          if (streamData.length > 58) {
            streamData = streamData.slice(0,58);
            streamData += '...';
          }
        } else {
          streamData += '<em>Offline</em>';
          status = "";
        }
        html += '<div class="row utente '+ status +'">';
        html += '<div class="col-md-2"><img src="' + usersFccImg[i] + '" /></div>';
        html += '<div class="col-md-2"><a href="https://www.twitch.tv/'+ usersFcc[i] +'">' + usersFcc[i] + '</a></div>';
        html += '<div class="col-md-8"><p>' + streamData + '</p></div>';
        html += '</div>';
      }});// end getJSON twitchStream

    $('.result').html(html);
    console.log(html);
}
});
