document.addEventListener("DOMContentLoaded",()=>{
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

  window.addEventListener("load",()=>setTimeout(()=>$(".page-loader")?.classList.add("hide"),450));

  const header=$(".site-header");
  const headerScroll=()=>header?.classList.toggle("scrolled",scrollY>40);
  headerScroll(); addEventListener("scroll",headerScroll,{passive:true});

  const menu=$(".mobile-menu");
  $(".menu-toggle")?.addEventListener("click",()=>menu?.classList.add("open"));
  $(".menu-close")?.addEventListener("click",()=>menu?.classList.remove("open"));
  $$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>menu?.classList.remove("open")));

  const reveal=()=>{
    const items=$$(".page-reveal");
    if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("visible"));return}
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}})
    },{threshold:.12,rootMargin:"0px 0px -50px"});
    items.forEach(x=>io.observe(x));
  }; reveal();

  // Keep the single requested wedding-video.mp4 source playable everywhere.
  $$("video").forEach(v=>{
    if(v.classList.contains("hero-video")||v.closest(".home-film")||v.closest(".featured-video")){
      v.muted=true; v.playsInline=true;
      v.play().catch(()=>{});
    }
  });

  const videoModal=$(".video-modal"), modalVideo=$(".video-box video");
  $$(".video-trigger").forEach(card=>card.addEventListener("click",()=>{
    const src=card.dataset.video||"wedding-video.mp4";
    modalVideo.src=src;
    videoModal?.classList.add("open");
    document.body.style.overflow="hidden";
    modalVideo.play().catch(()=>{});
  }));
  const closeVideo=()=>{
    if(!videoModal)return;
    videoModal.classList.remove("open"); modalVideo.pause(); modalVideo.removeAttribute("src"); modalVideo.load();
    document.body.style.overflow="";
  };
  $(".video-close")?.addEventListener("click",closeVideo);
  videoModal?.addEventListener("click",e=>{if(e.target===videoModal)closeVideo()});

  const imageModal=$(".image-modal"), modalImg=$(".image-modal img");
  $$(".work-photo img").forEach(img=>img.addEventListener("click",()=>{
    if(!imageModal)return;
    modalImg.src=img.src; imageModal.classList.add("open"); document.body.style.overflow="hidden";
  }));
  const closeImage=()=>{imageModal?.classList.remove("open");document.body.style.overflow=""};
  $(".image-close")?.addEventListener("click",closeImage);
  imageModal?.addEventListener("click",e=>{if(e.target===imageModal)closeImage()});

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){closeVideo();closeImage();menu?.classList.remove("open")}
  });

  const form=$("#enquiryForm");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const success=$(".form-success");
    if(success)success.style.display="block";
    form.reset();
  });

  $$('a[href="#"]').forEach(a=>a.addEventListener("click",e=>e.preventDefault()));
});