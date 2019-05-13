// ==UserScript==
// @name         XKCD Display Title
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  I am to lazy to hover the image so display the img.title below the comic
// @author       r44v
// @match        https://xkcd.com/*
// @grant        none
// ==/UserScript==

function tempercode() {
    const locationElement = document.getElementById('comic');
    const titleText = document.querySelector("#comic img").getAttribute('title');
    const newContent = "<hr /><p>" + titleText + "</p><hr />";
    locationElement.insertAdjacentHTML('beforeend', newContent);
}


//Dom loading snippet found at https://stackoverflow.com/questions/37798132/tampermonkey-userscript-doesnt-fire-domcontentloaded-event
(function() {
    'use strict';

    if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
        tempercode();
    } else {
        document.addEventListener("DOMContentLoaded", function(event) {
            tempercode();
        });
    }
})();
