// ==UserScript==
// @name         MSDN docs [en-us] redirect
// @version      0.1
// @description  Redirects to the en-us version of the current MSDN doc page [source: https://stackoverflow.com/a/50390953]
// @grant        none
// @match        https://docs.microsoft.com/*
// ==/UserScript==

(function () {
    let pathname = window.location.pathname.split('/');
    if (pathname[1].toLowerCase() !== 'en-us') {
        pathname[1] = 'en-us';
        pathname = pathname.join('/');
        window.location.href = window.location.origin + pathname + window.location.search;
    }
})();