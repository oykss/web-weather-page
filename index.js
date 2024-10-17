import{a as y,i as E}from"./assets/vendor-DFA7Gt-o.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const w=["rgba(255, 0, 0, 1)","rgba(255, 127, 0, 1)","rgba(255, 255, 0, 1)","rgba(0, 255, 0, 1)","rgba(0, 0, 255, 1)","rgba(75, 0, 130, 1)","rgba(148, 0, 211, 1)"];let p=-1;function v(){p===6&&(p=-1);const t=document.querySelector(".icon-type");t.style.fill=`${w[p]}`,p++}let m=0;const T=()=>(m===6&&(m=-1),m++,w[m]),h="/web-weather-page/",$=(t,s)=>{const{main:r,weather:a,coord:e,wind:n,name:o}=t;s.innerHTML=`
    <div class="place-wrap">
      <p class="place">${o} lon:${e.lon} lat:${e.lat}</p>
    </div>
    <div class="info">
      <svg class="icon-type">
        <use href="${h}icons.svg#${a[0].icon} "></use>
      </svg>
      
      <ul class="param">
      <li><h1>${a[0].description}</h1></li>
      
      <li>
        <p class="num">Humidity: ${r.humidity}</p>
      </li>

      <li>
        <p class="num">Wind-speed: ${n.speed}</p>
        <div class="compass">
          <svg class="icon-compass">
            <use href="${h}icons.svg#icon-compass"></use>
          </svg>
        </div>
        </li>
        <li>
          <p class="temp-subtitle">Temperature</p>
          <ul class="temperature">
            <li>
              <p class="num">now: <span data-temp>${r.temp}</span></p>
            </li>
            <li>
              <p class="num">min: <span data-temp>${r.temp_min}</span></p>
            </li>
            <li>
              <p class="num">max: <span data-temp>${r.temp_max}</span></p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,document.querySelector(".icon-compass").style.transform=`rotate(${n.deg-45}deg)`},b=(t,s)=>{s.innerHTML="",t.forEach(r=>{const{weather:a,main:e,dt_txt:n}=r;s.innerHTML+=`
    <div class="info swiper-slide">
      <svg class="icon-type"  style="fill: ${T()}">
        <use href="${h}icons.svg#${a[0].icon} "></use>
      </svg>
        <ul class="param">
          <li  class="description">
            <p class="num time">${n.slice(5,16)}</p>
            <p class="num">${a[0].description}</p>
          </li>
          
          <li>
            <p class="temp-subtitle">Temperature</p>
            <ul class="temperature">
              <li>
                <p class="num">min: <span data-temp>${e.temp_min}</span></p>
              </li>
              <li>
                <p class="num">max: <span data-temp>${e.temp_max}</span></p>
              </li>
          </ul>
        </li>
      </ul>
    </div>
    `})},S="9859d117ed95573d4fc4b41d3cfef105",x="https://api.openweathermap.org/data/2.5",u=async(t,s,r,a="metric")=>{const e=new URLSearchParams({appid:S,lang:"en",lon:s,lat:r,units:a});try{return(await y.get(`${x}/${t}?${e}`)).data}catch{}},d=async(t,s,r="metric")=>{const a=new URLSearchParams({appid:S,q:s,lang:"en",units:r});try{return(await y.get(`${x}/${t}?${a}`)).data}catch{}};function P(){return new Promise(t=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(s=>{const{latitude:r,longitude:a}=s.coords;t([a,r])},s=>{t([33.35,47.9167])}):t([33.35,47.9167])})}function A(t,s){const r=document.querySelectorAll("[data-temp]");t?(d("weather",t,s).then(a=>{const{temp:e,temp_max:n,temp_min:o}=a.main;r[0].textContent=e,r[1].textContent=n,r[2].textContent=o}),d("forecast",t,s).then(a=>{a.list.forEach((e,n)=>{const{temp_max:o,temp_min:c}=e.main;n+=3,n%2===0?r[n].textContent=o:r[n].textContent=c})})):P().then(a=>{u("weather",a[0],a[1],s).then(e=>{const{temp:n,temp_max:o,temp_min:c}=e.main;r[0].textContent=n,r[1].textContent=o,r[2].textContent=c}),u("forecast",a[0],a[1],s).then(e=>{e.list.forEach((n,o)=>{const{temp_max:c,temp_min:q}=n.main;o+=3,o%2===0?r[o].textContent=c:r[o].textContent=q})})})}const L=document.querySelector("#now"),_=document.querySelector("#some"),N=document.querySelector("form"),O=document.querySelector(".units"),I=document.querySelector(".theme");let f,i,l="metric";const C=new Swiper(".swiper-container",{direction:"vertical",slidesPerView:5,spaceBetween:20,mousewheel:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});P().then(t=>{u("weather",t[0],t[1]).then(s=>{$(s,L),f=setInterval(v,8e3)}),u("forecast",t[0],t[1]).then(s=>{b(s.list,_)}).finally(()=>{C.update()})});N.addEventListener("submit",t=>{t.preventDefault(),i=document.querySelector("input").value.trim(),i!==""&&Promise.all([d("weather",i,l).then(s=>{$(s,L),clearInterval(f),f=setInterval(v,8e3)}),d("forecast",i,l).then(s=>{b(s.list,_)})]).catch(()=>{i=null,E.error({message:"Sorry, no city was found with that name. Please try again!",position:"topRight",backgroundColor:"#ef4040"})}).finally(()=>{C.update()})});O.addEventListener("change",t=>{t.target.checked?l="imperial":l="metric",A(i,l)});const g=document.querySelector('[title="style-dark"]');I.addEventListener("change",t=>{t.target.checked?g.removeAttribute("disabled"):g.setAttribute("disabled","true")});
//# sourceMappingURL=index.js.map
