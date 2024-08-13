// ==UserScript==
// @name         twitter-redirect
// @namespace    custom
// @version      1.0
// @description  Redirects x to nitter site
// @author       r44v
// @match        https://x.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    document.location.host = "xcancel.com";
})();