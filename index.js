let names = ["FreeCodeCamp", "Nadeshot", "esl_sc2", "Izakooo", "noobs2ninjas", "brunofin"];
let currentUrl = "";
let channels = document.createElement('div')
let mainContainer = document.getElementById('mainContainer');
mainContainer.appendChild(channels);
for (var i = 0; i < names.length; i++) {
    currentUrl = `https://wind-bow.hyperdev.space/twitch-api/streams/${names[i]}?callback=?`;
    (function(i) { // protects i in an immediately called function
        $.getJSON(currentUrl, function(data) {
            let aContainer = document.createElement('a');
            aContainer.id = `a${i}`;
            channels.appendChild(aContainer);
            channels.className = "container";
            aContainer.setAttribute('href', `https://www.twitch.tv/${names[i]}`);
            aContainer.setAttribute('target', '_blank');
            let row = document.createElement('div');
            row.className = "row";
            aContainer.appendChild(row);
            let channelName = document.createElement('div');
            channelName.className = "col-xs-4";
            row.appendChild(channelName);
            row.id = `row${i}`;
            channelName.innerHTML = names[i];
            let channelStatus = document.createElement('div');
            channelStatus.className = "col-xs-8";
            row.appendChild(channelStatus);
            let pContainer = document.createElement('p');
            pContainer.id = `status${i}`;
            channelStatus.appendChild(pContainer);
            if (!data.error) {
                if (!data.stream) {
                    $(`#status${i}`).html("Stream is currently offline.");
                    $(`#row${i}`).addClass("offline");
                } else {
                    var game = data.stream.game;
                    $(`#status${i}`).html(`<b>${game}</b>: ${data.stream.channel.status}`);
                    $(`#row${i}`).addClass("streaming");
                    console.log(game);
                    console.log(data.stream.channel.status)
                }
            } else {
                $(`#status${i}`).html(data.message);
                $(`#row${i}`).addClass("notfound");
                let aRem = document.getElementById(`a${i}`);
                aRem.removeAttribute('href');
                aRem.removeAttribute('target');
            }
        });
    })(i);
}

$("#all").on("click", function() {
    $("#streaming").removeClass("active");
    $("#offline").removeClass("active")
    $("#all").addClass("active");
    $(".offline").show();
    $(".streaming").show();
    $(".notfound").show();


})

$("#streaming").on("click", function() {
    $("#all").removeClass("active");
    $("#offline").removeClass("active")
    $("#streaming").addClass("active");
    $(".offline").hide();
    $(".streaming").show();
    $(".notfound").hide();
})

$("#offline").on("click", function() {
    $("#all").removeClass("active");
    $("#streaming").removeClass("active");
    $("#offline").addClass("active");
    $(".streaming").hide();
    $(".offline").show();
    $(".notfound").hide();
})
