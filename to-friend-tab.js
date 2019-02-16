// ==UserScript==
// @name         Go to Friends Tab
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Scroll the profile then click the friends tab. Edit "madreloidpx" to own facebook profile id
// @author       madreloidpx
// @match        https://www.facebook.com/*
// @exclude      https://www.facebook.com/*/friends*
// @exclude      https://www.facebook.com/madreloidpx
// @grant        none
// ==/UserScript==

function goToFriendTab(){
    setTimeout(function() {window.location = document.querySelector('a[data-tab-key*=friends]').href}, 5000);
}

window.addEventListener('load', function() { goToFriendTab() });
