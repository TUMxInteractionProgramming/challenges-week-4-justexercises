/* #6 start the #external #action and say hello */
console.log("App is alive");

/* #7.3 Global variables */
var currentChannel = sevenContinents;
var currentLocation = {longitude: -54.658864,
                       latitude: -69.598411,
                       what3words: 'spaghetti.scavengers.simulations'}

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 * #7.2 modified to use objects from channels.js
 */
function switchChannel(channel) {
    //Log the channel switch
    console.log("Tuning in to channel", channel.name);
    /* 7.3 add channel to new global variable currentChannel */
    currentChannel = channel;

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channel.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/upgrading.never.helps" target="_blank"><strong>upgrading.never.helps</strong></a>';

    /* #6 #liking channels on #click NEXT */
    /* #7.2 using channels.js */
    var starIndicator = channel.starred ? 'fas fa-star' : 'far fa-star';
    $('#channel-star').removeClass().addClass(starIndicator);

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channel.name + ')').addClass('selected');


}

/* #6 #liking a channel on #click */
function star() {
    // $('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star.png');
    // #7.1 using awesome font
    $('#channel-star').toggleClass("fas far");
    /* #7.4 Toggle de starred property on selected channel */
    currentChannel.starred = $('#channel-star').hasClass('fas');
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/**
 * #8.1 constructor for messages
 */
function Message(createdBy, latitude, longitude, text, own) {
    this.createdBy = createdBy,
    this.latitude = latitude,
    this.longitude = longitude,
    this.createdOn = new Date()
    this.expiresOn = Date.now() + (15*60*1000),
    this.text = text,
    this.own = true
}

/**
 * #8.1 sendMessage function for send button
 */
function sendMessage() {
    // say hello!
    var helloMessage = new Message(" " ," " ," " ,"Hello Chatter");
    console.log(helloMessage);

    // #8.2 insert message
    var textMessage = $('#message-text').val();
    // console.log("Message text: "+ textMessage); // for debugging
    var messageObject = new Message (currentLocation.what3words, " ", " ", textMessage);
    createMessageElement(messageObject);

    // #8.2 clear imput
    $('#message-text').val(" ");
}

/**
 * #8.1 function to write messages into HTML document
 */
function createMessageElement(messageObject) {
    var createdBy = messageObject.createdBy;
    var createdOn = messageObject.createdOn.toLocaleString('en-US', {timezone: 'UTC'}); //toDateString();
    var expiresInMs = (messageObject.expiresOn - Date.now()) / 60000;
    var expiresIn = Math.round(expiresInMs);
    var text = messageObject.text;

    var messageInnerHTML = "<div class='message'><h3><a href='https://www.what3words.com/" + createdBy + "' target='_blank'><strong>"  + createdBy + "</strong></a>" + createdOn + "<em>" + expiresIn + "min. left</em></h3><p>" + text + "</p><button>+5 min.</button></div>";
    $('#messages').append(messageInnerHTML);
}

/**
 * #8.3 dynamically build channels
 */
function listChannels() {
    //var channelObject {}
    createChannelElement(prueba);
}

function createChannelElement(channelObject) {
    var onclickChannel = channel.name;
    var clasStar = "theClassStar";
    var my_onclick = switchChannel(onclickChannel);
    var widgets = [{
        "li" : {"onclick" : my_onclick, "text" : "channel.name" },
        "span" : {"class" : "channel-meta"},
        "i" : {"class" : clasStar},
        "i" : {"class" : "fas fa-chevron-right", "alt" : "select"}
    }];
    $(function() {
        $.each(widgets, function(i, item){
            $('<li>').attr({'onclick': item.li.onclick,
                            'text' : item.li.text}).html(
                $('<span>').attr('class', item.span.class).html(
                    $("<i>").attr('class', item.i.class)(
                        $("<i>").attr('class', item.i.class)))).appendTo('#channels');
        });
    });
}
