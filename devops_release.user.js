// ==UserScript==
// @name     Stop clicking Releases
// @version  1
// @grant    none
// @match    https://dev.azure.com/*
// ==/UserScript==

function colorRelease() {
    var element = document.getElementById('__bolt-ms-vss-releaseManagement-web-hub-explorer-2-link');
    if (element !== 'undefined') {
        element.style.backgroundColor = "#f00";
      var icon = element.getElementsByClassName("fabric-icon")[0];
      icon.classList.remove("ms-Icon--Rocket");
      icon.classList.add("ms-Icon--Blocked");
    }
    
    
  }
  
  function tempercode() {
        setInterval(colorRelease, 2000);
        console.log("Hello");
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
         document.addEventListener("scroll", function(event) {
        tempercode();
      }); 
  })();
  