(function(){
  "use strict";

  /* ---------- Navbar shrink on scroll ---------- */
  var nav = document.getElementById('siteNav');
  var backTop = document.getElementById('backTop');
  if(nav){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      nav.classList.toggle('shrink', y > 40);
      if(backTop) backTop.classList.toggle('show', y > 500);
    }, {passive:true});
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burgerBtn');
  var navLinks = document.getElementById('navLinks');
  if(burger && navLinks){
    burger.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a.nav-link').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- Conference dropdown ---------- */
  var dropdownWrap = document.getElementById('confDropdown');
  var confToggle = document.getElementById('confToggle');
  if(dropdownWrap && confToggle){
    confToggle.addEventListener('click', function(e){
      e.stopPropagation();
      var open = dropdownWrap.classList.toggle('open');
      confToggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function(e){
      if(!dropdownWrap.contains(e.target)){
        dropdownWrap.classList.remove('open');
        confToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  /* ---------- Scrollspy for same-page sections (home only) ---------- */
  var sections = document.querySelectorAll('main section[id], header[id]');
  var navAnchors = document.querySelectorAll('.nav-links a.nav-link[href^="#"]');
  if(sections.length && navAnchors.length && 'IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function(a){
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
    sections.forEach(function(s){ spy.observe(s); });
  }

  /* ---------- Marquee content (any page with #marqueeTrack) ---------- */
  var track = document.getElementById('marqueeTrack');
  if(track){
    var partners = ['IEEE Madras Section','Cisco','Intel','ACM Madras','IEEE Info Theory Society','IEEE Computer Society','VIT Vellore','Yellow.ai'];
    var html = '';
    (partners.concat(partners)).forEach(function(name){
      html += '<span class="logo-badge"><span class="dot"></span>' + name + '</span>';
    });
    track.innerHTML = html;
  }

  /* ---------- Generic tabs (.host-tabs / .host-panel) ---------- */
  var tabButtons = document.querySelectorAll('.host-tabs button');
  var panels = document.querySelectorAll('.host-panel');
  if(tabButtons.length){
    tabButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var group = btn.closest('.host-tabs').nextElementSibling ? btn.closest('.tabs-block') : document;
        tabButtons.forEach(function(b){ b.classList.remove('active'); });
        panels.forEach(function(p){ p.classList.remove('active'); });
        btn.classList.add('active');
        var target = document.querySelector('.host-panel[data-panel="' + btn.dataset.tab + '"]');
        if(target) target.classList.add('active');
      });
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById('copyEmailBtn');
  if(copyBtn){
    copyBtn.addEventListener('click', function(){
      var email = 'icetiteconference@vit.ac.in';
      if(navigator.clipboard){
        navigator.clipboard.writeText(email).then(function(){
          copyBtn.textContent = 'Copied';
          setTimeout(function(){ copyBtn.textContent = 'Copy'; }, 1800);
        });
      }
    });
  }

  /* ---------- Back to top ---------- */
  if(backTop){
    backTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  var heroVideo = document.getElementById('heroVideo');
  if(heroVideo){
    var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    var desktopViewport = window.matchMedia('(min-width: 768px)');
    var videoSource = heroVideo.querySelector('source[data-src]');
    var videoTimer;
    var updateHeroVideo = function(){
      var shouldPlay = window.innerWidth >= 768 && !motionPreference.matches;
      if(!shouldPlay){
        heroVideo.pause();
        heroVideo.removeAttribute('autoplay');
        if(videoSource && videoSource.hasAttribute('src')){
          videoSource.removeAttribute('src');
          heroVideo.load();
        }
        return;
      }
      if(videoSource && !videoSource.getAttribute('src')){
        videoSource.setAttribute('src', videoSource.dataset.src);
        heroVideo.load();
      }
      heroVideo.setAttribute('autoplay', '');
      var playRequest = heroVideo.play();
      if(playRequest && playRequest.catch) playRequest.catch(function(){});
    };
    window.addEventListener('resize', function(){
      window.clearTimeout(videoTimer);
      videoTimer = window.setTimeout(updateHeroVideo, 120);
    });
    if(motionPreference.addEventListener) motionPreference.addEventListener('change', updateHeroVideo);
    if(desktopViewport.addEventListener) desktopViewport.addEventListener('change', updateHeroVideo);
    updateHeroVideo();
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- One orchestrated hero entrance ---------- */
  var heroEls = document.querySelectorAll('.hero h1, .hero .lead, .hero-sponsor, .hero-date, .hero-meta, .hero-actions, .hero-links, .page-hero .crumb, .page-hero h1, .page-hero p');
  heroEls.forEach(function(el, i){
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    setTimeout(function(){
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 120 + i * 90);
  });

  /* ---------- Contact form (client-side only, no backend) ---------- */
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var subject = document.getElementById('cf-subject').value.trim() || 'Website enquiry';
      var message = document.getElementById('cf-message').value.trim();
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      var successBox = document.getElementById('formSuccess');
      window.location.href = 'mailto:icetiteconference@vit.ac.in?subject=' + encodeURIComponent(subject) + '&body=' + body;
      if(successBox){
        successBox.classList.add('show');
        successBox.textContent = 'Your email client should now be open with your message pre-filled. If nothing opened, email us directly at icetiteconference@vit.ac.in.';
      }
    });
  }

})();
