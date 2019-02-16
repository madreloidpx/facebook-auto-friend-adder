// ==UserScript==
// @name         Go to Friend Page
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Selects a friend from the list of friends. Edit "madreloidpx" to own facebook profile id
// @author       madreloidpx
// @match        https://www.facebook.com/madreloidpx/friends*
// @grant        none
// ==/UserScript==


var friends = [];

function scrollDown(){
    setTimeout(function() {window.scrollBy(0, document.body.scrollHeight);}, 1000);
}

function MutationObserverCallback(mutations){ //checks for changes in the DOM
    for(let mutation of mutations){
        const friendListList = [].slice.call(mutation.target.querySelectorAll('ul[class*=uiList]'));
        getFriendList(friendListList);
    }
}

function selectFriend(){
    return friends[Math.floor(Math.random()*friends.length)];
}

function getFriendList(friendListList){
    friends = [];
    for(let fll in friendListList){
        const friendList = [].slice.call(friendListList[fll].querySelectorAll('li'));
        for(let friend in friendList){
            var name = friendList[friend].querySelector('div[class*=fsl]');
            var button = friendList[friend].querySelector('span[class*=_55pe]');
            if(button.innerText == 'Friends') friends.push(name);
        }
    }
    if(friends != [] && Math.random() < 0.8) scrollDown();
    else{
        var friend = selectFriend();
        goToFriend(friend.querySelector('a').href);
    }
}

function goToFriend(url){
    window.location = url;
}

function randomFriendNum(){
    const maxFriends = document.querySelector('span[class*=_gs6]').innertext;
    return Math.round(Math.random()*maxFriends);
}

function findFriends(){
    const friends = document.querySelector('[id*=pagelet_timeline_app_collection]');
    const friendListList = [].slice.call(friends.querySelectorAll('ul[class*=uiList]'));
    for(let fll in friendListList){
        const friendList = [].slice.call(friendListList[fll].querySelectorAll('li'));
        const valid = getFriendList(friendList);
        if(valid != null) break;
    }
    const config = { childList: true };
    const observer = new MutationObserver(MutationObserverCallback);
    observer.observe(friends, config);
}

window.addEventListener('load', function() { findFriends(); });
