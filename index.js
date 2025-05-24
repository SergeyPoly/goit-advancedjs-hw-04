import{a as E,S as P,i as n}from"./assets/vendor-Bg_GrDtl.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const S="50367317-4b50f00e153dc123b8b56efd6",q="https://pixabay.com/api/",x=15;async function v(o,t=1){const r={key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:x,page:t};return(await E.get(q,{params:r})).data}const w=document.querySelector(".gallery");let F=new P(".gallery a",{captionsData:"alt",captionDelay:250});function O(){w.innerHTML=""}function L(o){w.insertAdjacentHTML("beforeend",o.map(({webformatURL:t,largeImageURL:r,tags:a,likes:e,views:i,comments:s,downloads:b})=>`
      <li class="gallery-item">
        <a href="${r}">
          <img src="${t}" alt="${a}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <p class="title">Likes</p>
            <p>${e}</p>
          </div>
          <div class="info-item">
            <p class="title">Views</p>
            <p>${i}</p>
          </div>
          <div class="info-item">
            <p class="title">Comments</p>
            <p>${s}</p>
          </div>
          <div class="info-item">
            <p class="title">Downloads</p>
            <p>${b}</p>
          </div>
        </div>
      </li>
    `).join("")),F.refresh()}function m(o){o.classList.remove("hidden")}function u(o){o.classList.add("hidden")}const y=document.querySelector(".form"),l=document.querySelector(".load-more"),p=document.querySelector(".loader");let h=1,f="",g=0,c=0;function d({message:o,icon:t,color:r}){return{icon:t,iconColor:"white",message:o,messageColor:"white",position:"topRight",timeout:3e3,color:r,maxWidth:"432px"}}y.addEventListener("submit",async o=>{if(o.preventDefault(),f=y.elements.query.value.trim(),!f){n.show(d({message:"Please enter a search query!",color:"#EF4040",icon:"fa-solid fa-circle-exclamation"}));return}O(),h=1,c=0,u(l),m(p);try{const t=await v(f,h),r=t.hits;if(g=t.totalHits,!r.length){n.show(d({message:"Sorry, there are no images matching your search query. Please try again!",color:"#EF4040",icon:"fa-solid fa-circle-exclamation"}));return}L(r),c+=r.length,c<g&&m(l)}catch{n.show(d({message:"Something went wrong. Please try again later.",color:"#EF4040",icon:"fa-solid fa-circle-exclamation"}))}finally{u(p)}});l.addEventListener("click",async()=>{h+=1,u(l),m(p);try{const t=(await v(f,h)).hits;c+=t.length,L(t);const{height:r}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),c>=g?n.show(d({message:"We're sorry, but you've reached the end of search results.",color:"#00BFFF",icon:"fa-solid fa-circle-info"})):m(l)}catch{n.show(d({message:"Failed to load more images.",color:"#EF4040",icon:"fa-solid fa-circle-exclamation"}))}finally{u(p)}});
//# sourceMappingURL=index.js.map
