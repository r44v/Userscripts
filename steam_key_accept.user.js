// ==UserScript==
// @name     Steam Auto check key activate 348457
// @version  1
// @grant    none
// @match    https://store.steampowered.com/account/registerkey*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(function() {
	$("#accept_ssa").prop('checked', true);
});
