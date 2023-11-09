/** @program: 		DeviantIO 
 * @brief: 			Additional functionality for Deviant Art 
 * @author: 		Justin D. Byrne 
 * @email: 			justin@byrne-systems.com 
 * @version: 		0.0.1 
 * @license: 		GPL-2.0
 */

"use strict";(o=>{let c={accent_colour:"rgba(118, 228, 177, 1)",mousetrap_cdn:"//cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.min.js",favorite_next:!0,time_interval:500,url_reference:void 0,deviantarturl:"https://www.deviantart.com",input_hotkeys:{favorite:["space","enter"],watch:["shift"],previous:["left"],next:["right"],profile:["up"],redirect:["down"],user:["/"]},shared_styles:{position:"absolute","z-index":999,"font-size":"4em","transform-origin":"50% 5em"}},n={watch:"[data-hook='user_watch_button']",favourite:"[data-hook='fave_button']",stage:"[data-hook='art_stage']",thumbs:"[data-hook='deviation_std_thumb']",user:"[data-hook='user_link']"},t=["https://google.com","https://gmail.com","https://github.com","https://trello.com"],i={site:{home:c.deviantarturl+"/\\B",watch:c.deviantarturl+"/watch/deviations",daily:c.deviantarturl+"/daily-deviations",popular:c.deviantarturl+"/popular/deviations",topic:c.deviantarturl+"/topic/w+",tag:c.deviantarturl+"/tag/w+",art:c.deviantarturl+"/[^/]+/art/.+"},user:{favourites:c.deviantarturl+"/(?!watch|daily|tag|popular)w+/?favourites",gallery:c.deviantarturl+"/(?!watch|daily|tag|popular)w+/?gallery",home:c.deviantarturl+"/(?!watch|daily|tag|popular)w+"}},l={notifications:{watch:{css:{...c.shared_styles,animation:"wiggle 2s linear infinite",left:"calc(77% - 1em)",top:"calc(183% - 0em)"},animation:"@keyframes wiggle{0%, 7%    { transform: rotateZ(0);      }15%       { transform: rotateZ(-15deg); }20%       { transform: rotateZ(10deg);  }25%       { transform: rotateZ(-10deg); }30%       { transform: rotateZ(6deg);   }35%       { transform: rotateZ(-4deg);  }40%, 100% { transform: rotateZ(0);      }}"},favourite:{css:{...c.shared_styles,animation:"bounce 1s ease-out infinite",left:"calc(3% - 0em)",top:"calc(183% - 0em)","transform-origin":"50% 5em"},animation:"@keyframes bounce{0%   { transform: translateY(0);     }50%  { transform: translateY(-10px); }100% { transform: translateY(0);     }}"}}},u={off:{border:"none",boxShadow:"none",opacity:1},on:{border:"2px solid "+c.accent_colour,boxShadow:"0px 0px 5px 2px "+c.accent_colour,opacity:.5}},s={favorite:()=>{Mousetrap.bind("%KEYS%",function(e){e.preventDefault(),deviantIO.clearStatus("favourite"),(fave_button=document.querySelectorAll("[data-hook='fave_button']")[0]).click(),deviantIO.config.favorite_next&&Mousetrap.trigger("%NEXT%")})},watch:()=>{Mousetrap.bind("%KEYS%",function(e){e.preventDefault(),deviantIO.clearStatus("watch"),(watch_button=document.querySelectorAll("[data-hook='user_watch_button']")[0]).click()})},previous:()=>{Mousetrap.bind("%KEYS%",function(e){deviantIO.clearStatus("favourite"),deviantIO.clearStatus("watch"),(prev_button=document.querySelectorAll("[data-hook='arrowL']")[0].children[0]).click()})},next:()=>{Mousetrap.bind("%KEYS%",function(e){deviantIO.clearStatus("favourite"),deviantIO.clearStatus("watch"),(next_button=document.querySelectorAll("[data-hook='arrowR']")[0].children[0]).click()})},profile:()=>{Mousetrap.bind("%KEYS%",function(e){e.preventDefault();var t;let a=null;for(t of["Profile","Back","Home"])try{a=document.evaluate(`//span[text()='${t}']`,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.parentElement}catch(e){}null!=a&&a.click()})},redirect:()=>{Mousetrap.bind("%KEYS%",function(e){e.preventDefault(),entry=Math.floor(Math.random()*deviantIO.config.redirect_urls.length),o.open(deviantIO.config.redirect_urls[entry],"_blank")})},user:()=>{Mousetrap.bind("%KEYS%",function(e){e.preventDefault(),(user_button=document.querySelectorAll("[data-hook='user_link']")[0].children[0]).click()})}};function d(e,t){var a=document.createElement("span");a.id=e+"_button",a.innerHTML="favourite"==e?"❤️":"🔍",a.style.cssText=function(e){let t="";for(var[a,r]of Object.entries(e))r="number"==typeof r&&"z-index"!=a?r+"px":r,t+=`${a}: ${r}; `;return t}(t.css),document.getElementsByTagName("header")[0].appendChild(a)}function f(e,t){var a,r;a=t,(r=document.createElement("style")).type="text/css",r.innerHTML=a.animation,document.getElementsByTagName("head")[0].appendChild(r),d(e,t)}function r(e){var t=function(e){let t=void 0;try{t=e.children[1].children[2].children[2].children[1].children[1].children[0].children[0].children[0].outerHTML}catch(e){}return null!=t?t:console.warn("Could not get portrait thumb's path !")}(e);if(/fill-rule=\"evenodd\"/.test(t))for(var a in u.off)e.style[a]=u.off[a];else for(var r in u.on)e.style[r]=u.on[r]}function a(){o.addEventListener("load",()=>{var e,t="text/javascript",a=document.createElement("script");for(e in a.type=t,s)a.text+=function(e,t){var a=c.input_hotkeys[e];let r=t.toString(),o="";if(1==a.length)o=`'${a[0]}'`;else for(var n in a)o+=`'${a[n]}',`;return o=`[ ${o.replace(/,+$/,"")} ]`,(r="favorite"==e?r.replace(/\([^\{]+{/,"").replace(/'%KEYS%'/,o).replace(/'%NEXT%'/,`'${c.input_hotkeys.next[0]}'`):r.replace(/\([^\{]+{/,"").replace(/'%KEYS%'/,o)).substring(0,r.length-1)}(e,s[e]);a.onload=()=>console.info(">> Mousetrap script has loaded !"),a.onerror=()=>console.warn(">> Mousetrap script has errored !"),document.body.appendChild(a);var r=document.createElement("script");r.type=t,r.text=setInterval(g,c.time_interval),r.onload=()=>console.info(">> DeviantIO script has loaded !"),r.onerror=()=>console.warn(">> DeviantIO script has errored !"),document.body.appendChild(r)})}function h(){var e,t;a();for(e of document.querySelectorAll(deviantIO.config.ui_data_hooks.favourite))e.addEventListener("click",()=>{deviantIO.checkStatus("favourite")});for(t of document.querySelectorAll(deviantIO.config.ui_data_hooks.watch))t.addEventListener("click",()=>{deviantIO.checkStatus("watch")})}function p(e){return e.charAt(0).toUpperCase()+e.slice(1)}function v(e){var t=document.getElementById(e+"_button");"favourite"==e&&(document.querySelectorAll(n.stage)[0].style.backgroundColor=""),null!=t&&t.remove()}function m(e){var t,a,r="flagged"+p(e)+"Status";"yes"!=(localStorage.getItem(r)||"")&&(!function(e){var t=document.querySelectorAll(n[e])[0];switch(e){case"watch":return null!=t&&"Watch"===t.innerText;case"favourite":return"In Favourites"===t.innerText}}(e)?v(e):(r=e,e=document.getElementById(r+"_button"),t=l.notifications[r],a="flagged"+p(r)+"Status",document.querySelectorAll(n.stage)[0].style.backgroundColor="favourite"==r?c.accent_colour:"",null==e&&f(r,t),localStorage.setItem(a,"yes")))}function g(){var e,t;switch((e=o.location.href)!=c.url_reference&&(c.url_reference=e,localStorage.clear()),function(){var e,t=o.location.href,a=i;for(e in a)for(var r in a[e])if(new RegExp(a[e][r]).test(t))return{category:e,type:r}}().type){case"art":m("favourite"),m("watch");break;case"home":case"watch":case"daily":case"popular":case"topic":case"tag":case"favourites":case"gallery":var a=0<(t=document.querySelectorAll(n.thumbs)).length?t:console.warn("Portrait thumbs could not be cached !");for(let e=0;e<a.length;e++)r(a[e]);break;default:console.warn(`Nothing to do for present url: ${c.url_reference}.`)}}function e(){var e;o.deviantIO=((e={config:c}).config.redirect_urls=t,e.config.ui_data_hooks=n,e.clearStatus=e=>v(e),e.checkStatus=e=>m(e),e),(e=document.createElement("script")).setAttribute("src",c.mousetrap_cdn),document.head.appendChild(e),h()}void 0===o.deviantIO&&e()})(window);