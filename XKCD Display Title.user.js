// ==UserScript==
// @name         XKCD Display Title
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  I am to lazy to hover the image so display the img.title below the comic
// @author       r44v
// @match        https://xkcd.com/*
// @grant        none
// ==/UserScript==

$(function() {
    $("#comic").append("<hr /><p>" + $("#comic img").attr('title') + "</p><hr />");
})();