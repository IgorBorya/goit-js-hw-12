import{a as g,S as p,i}from"./assets/vendor-BjmtRwYh.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const y="45339171-09ca964bcb6303fe660a59875",h="https://pixabay.com/api/";async function u(t,r=1,s=12){try{return(await g.get(h,{params:{key:y,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:s}})).data}catch(n){throw console.error("Error fetching images:",n),n}}function f(t){const r=document.querySelector("#gallery"),s=t.map(e=>`
      <a href="${e.largeImageURL}" class="gallery__item">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b> ${e.likes}</p>
          <p class="info-item"><b>Views</b> ${e.views}</p>
          <p class="info-item"><b>Comments</b> ${e.comments}</p>
          <p class="info-item"><b>Downloads</b> ${e.downloads}</p>
        </div>
      </a>
    `).join("");r.insertAdjacentHTML("beforeend",s),new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const b=document.querySelector("#search-form"),d=document.querySelector("#load-more");let a=1,c="";b.addEventListener("submit",w);d.addEventListener("click",L);async function w(t){if(t.preventDefault(),c=t.currentTarget.elements.searchQuery.value.trim(),a=1,S(),!c){i.warning({title:"Warning",message:"Please enter a search query."});return}try{const r=await u(c,a);if(r.hits.length===0){i.error({title:"Error",message:"No images found. Please try again."});return}f(r.hits),m(r.totalHits>a*r.hits.length)}catch{i.error({title:"Error",message:"Something went wrong. Please try again."})}}async function L(){a+=1;try{const t=await u(c,a);f(t.hits),m(t.totalHits>a*t.hits.length)}catch{i.error({title:"Error",message:"Something went wrong. Please try again."})}}function S(){const t=document.querySelector("#gallery");t.innerHTML=""}function m(t){d.style.display=t?"block":"none"}
//# sourceMappingURL=commonHelpers.js.map
