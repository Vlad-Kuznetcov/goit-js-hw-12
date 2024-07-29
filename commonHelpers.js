import{S as a,i as c}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();function u(r){document.querySelector(".form").insertAdjacentHTML("afterend",'<div class="loader"></div>');const i="https://pixabay.com/api/",n=new URLSearchParams({key:"45057307-b447de7416eadb33be54d4a0d",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20}),t=`${i}?${n}`;return fetch(t).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>e).catch(e=>{console.error("Error fetching images:",e)}).finally(()=>{const e=document.querySelector(".loader");e&&e.remove()})}const f=document.querySelector(".gallery");function m({webformatURL:r,largeImageURL:o,tags:i,likes:n,views:t,comments:e,downloads:s}){return`<li class="gallery-item"> 
    <figure class="sign">
      <a href="${o}">
        <img class="list-img" src="${r}" alt="${i}" title="" width="360" height="200"/>
      </a>
      <figcaption class="title-img">
        <ul class="figcaption">
          <li class="figcaption-item">Likes<p class="counter">${n}</p></li>
          <li class="figcaption-item">Views<p class="counter">${t}</p></li>
          <li class="figcaption-item">Comments<p class="counter">${e}</p></li>
          <li class="figcaption-item">Downloads<p class="counter">${s}</p></li>
        </ul>
      </figcaption>
    </figure>
  </li>`}function p(r){return r.map(m).join("")}function g(r){const o=p(r);f.innerHTML=o}const l={btnSearch:document.querySelector(".btn-search"),form:document.querySelector(".form"),input:document.querySelector("input"),ul:document.querySelector("ul")};l.form.addEventListener("submit",r=>{r.preventDefault(),l.ul.innerHTML="",l.input.value.trim()?u(l.input.value).then(i=>{i.total!==0?(g(i.hits),new a(".gallery a").refresh()):c.error({message:"SSorry, there are no images matching your search query. Please try again!",position:"topRight"})}).catch(i=>console.log(i)).finally(()=>{l.input.value=""}):c.error({message:"Enter value",position:"topRight"})});
//# sourceMappingURL=commonHelpers.js.map
