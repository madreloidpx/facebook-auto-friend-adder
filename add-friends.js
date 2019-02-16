// ==UserScript==
// @name         Add Friends
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Click a friend or click add friend. Edit "madreloidpx" to own facebook profile id
// @author       madreloidpx
// @match        https://www.facebook.com/*/friends*
// @exclude      https://www.facebook.com/madreloidpx/friends*
// @exclude      https://www.facebook.com/madreloidpx
// @grant        none
// ==/UserScript==

var notFriends = [];

function scrollDown(){
    setTimeout(function() {window.scrollBy(0, document.body.scrollHeight);}, 1000);
}

function printDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

function MutationObserverCallback(mutations){ //checks for changes in the DOM
    for(let mutation of mutations){
        const friendListList = [].slice.call(mutation.target.querySelectorAll('ul[class*=uiList]'));
        getAddFriendList(friendListList);
    }
}

function log(name, t){
    console.log(name + 'is added at time: ' + t);
}

function getAddFriendList(friendListList){
    notFriends = [];
    for(let fll in friendListList){
        const friendList = [].slice.call(friendListList[fll].querySelectorAll('li'));
        for(let friend in friendList){
            var name = friendList[friend].querySelector('div[class*=fsl]');
            var button = friendList[friend].querySelector('button:not([class*=hidden_elem])');
            if(button != null) notFriends.push([name, button]);
        }
    }
    if(notFriends == []) scrollDown();
    if(notFriends != [] && Math.random() < 0.7) scrollDown();
    else{
        var friend = selectFriend();
        const name = friend[0].innerText;
        const button = friend[1];
        button.click();
        log(name, printDate());
        window.location = document.querySelector('a[title*=Profile]').href;
    }
}

function selectFriend(){
    return notFriends[Math.floor(Math.random()*notFriends.length)];
}

function addFriend(){
    const friends = document.querySelector('[id*=pagelet_timeline_app_collection]');
    const friendListList = [].slice.call(friends.querySelectorAll('ul[class*=uiList]'));
    for(let fll in friendListList){
        const friendList = [].slice.call(friendListList[fll].querySelectorAll('li'));
        const valid = getAddFriendList(friendList);
        if(valid != null) break;
    }
    const config = { childList: true };
    const observer = new MutationObserver(MutationObserverCallback);
    observer.observe(friends, config);
}

window.addEventListener('load', function() { addFriend() });
