// ==UserScript==
// @name         Scheduler
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Start script here. Scheduler and click on friends list. Edit "madreloidpx" to own facebook profile id
// @author       madreloidpx
// @match        https://www.facebook.com/madreloidpx
// @exclude       https://www.facebook.com/madreloidpx/friends*
// @grant        none
// ==/UserScript==


function randomTimes(){
    var amtToAdd = Math.round(Math.random()*19+1);
    var timeRangeInMilli = toMillisec(24);
    var timeCounter = Math.round(Math.random()*(timeRangeInMilli/amtToAdd));
    return timeCounter;
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function toMillisec(hrs){
    return hrs*60*60*1000;
}

function runTimer(timeCounter){
    console.log('Start program!');
    var dateToPost = Date.now();
    dateToPost += timeCounter;
    dateToPost = new Date(dateToPost);
    console.log('Will add a person at:');
    console.log(dateToPost.toString());
    sleep(timeCounter);
    openFriends();
}

function openFriends(){
    window.location = document.querySelector('a[data-tab-key*=friends]').href;
}

window.addEventListener('load', function() { runTimer(randomTimes()) });
