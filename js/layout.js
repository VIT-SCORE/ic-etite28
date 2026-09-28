(function () {
  'use strict';

  var conference = window.CONF || {
    name: "ic-ETITE'28",
    dates: '10-11 February 2028',
    email: 'icetiteconference@vit.ac.in',
    address: 'Vellore Institute of Technology, Katpadi, Vellore, Tamil Nadu 632014, India'
  };
  var currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
  var headerMount = document.getElementById('site-header');
  var footerMount = document.getElementById('site-footer');

  function navLink(file, label, key) {
    var active = currentFile === file ? ' active' : '';
    var current = currentFile === file ? ' aria-current="page"' : '';
    return '<li><a class="nav-link' + active + '" href="' + file + '"' + current + '>' + label + '</a></li>';
  }

  function dropdown(label, id, links) {
    var markedCurrentPage = false;
    links = links.replace(/<a class="nav-link" href="([^"]+)"/g, function (markup, href) {
      var destination = href.split('#')[0];
      if (destination === currentFile && !markedCurrentPage) {
        markedCurrentPage = true;
        return '<a class="nav-link active" aria-current="page" href="' + href + '"';
      }
      return markup;
    });
    return '<li class="has-dropdown" id="' + id + '">' +
      '<button class="nav-link-btn menu-toggle" type="button" aria-expanded="false" aria-controls="' + id + '-panel">' +
      label + ' <span class="caret" aria-hidden="true">&#9662;</span></button>' +
      '<div class="dropdown-panel" id="' + id + '-panel">' + links + '</div></li>';
  }

  if (headerMount) {
    headerMount.innerHTML =
      '<div class="site-topbar"><div class="wrap">' +
        '<a class="topbar-title" href="index.html">' + conference.name + '</a>' +
        '<a class="topbar-chapter" href="https://ieee-its-1-tzbd.vercel.app/" target="_blank" rel="noopener">' +
          '<span class="chapter-mark" aria-hidden="true">ITS</span><span>IEEE ITS VIT VELLORE</span>' +
        '</a>' +
      '</div></div>' +
      '<nav class="site-nav" id="siteNav" aria-label="Main navigation"><div class="wrap">' +
        '<a class="brand" href="index.html" aria-label="ic-ETITE\'28 home"><img class="brand-logo" src="assets/12Asset 1.svg" alt="ic-ETITE\'28"></a>' +
        '<button class="burger" id="burgerBtn" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>' +
        '<ul class="nav-links" id="navLinks">' +
          navLink('index.html', 'Home') +
          navLink('about.html', 'About') +
          navLink('committees.html', 'Committees') +
          dropdown('Call for Papers', 'cfpDropdown',
            '<a class="nav-link" href="call-for-papers.html#guidelines">Submission Guidelines</a>' +
            '<a class="nav-link" href="tracks.html">Conference Research Tracks</a>' +
            '<a class="nav-link" href="call-for-papers.html#submit">Submit on EasyChair</a>') +
          navLink('important-dates.html', 'Dates') +
          navLink('registration.html', 'Registration') +
          navLink('visa.html', 'Visa') +
          dropdown('Events', 'eventsDropdown',
            '<a class="nav-link" href="events.html">All Co-located Events</a>' +
            '<a class="nav-link" href="index.html">ic-ETITE\'28 Conference</a>' +
            '<a class="nav-link" href="hackathon.html">BOLT 3.0 Hackathon</a>' +
            '<a class="nav-link" href="technext.html">TechNext \'28 Expo</a>' +
            '<a class="nav-link" href="keynote-speakers.html">Keynote Speakers</a>' +
            '<a class="nav-link" href="tracks.html">Paper Presentation Tracks</a>') +
          navLink('contact.html', 'Contact') +
          dropdown('More', 'moreDropdown',
            '<a class="nav-link" href="advisory.html">Advisory Board</a>' +
            '<a class="nav-link" href="venue.html">Campus Venue &amp; Travel</a>' +
            '<a class="nav-link" href="visa.html">Visa &amp; Travel Information</a>' +
            '<a class="nav-link" href="team.html">Web Development Team</a>' +
            '<a class="nav-link" href="https://ieee-its-1-tzbd.vercel.app/" target="_blank" rel="noopener">IEEE ITS Chapter Portal</a>') +
        '</ul>' +
        '<div class="nav-actions" aria-label="Featured links">' +
          '<a class="nav-action" href="technext.html">TechNext \'28</a>' +
          '<a class="nav-action nav-action-secondary" href="hackathon.html">BOLT 3.0</a>' +
          '<a class="vit-action" href="https://vit.ac.in/" target="_blank" rel="noopener" aria-label="VIT official website">' +
            '<img src="assets/vit-white-logo.png" alt="Vellore Institute of Technology">' +
          '</a>' +
        '</div>' +
      '</div></nav>';
  }

  if (footerMount) {
    footerMount.innerHTML =
      '<footer class="site-footer" id="contact-block"><div class="wrap">' +
        '<div class="footer-host-row">' +
          '<a class="footer-vit" href="https://vit.ac.in/" target="_blank" rel="noopener"><img src="assets/vit-white-logo.png" alt="Vellore Institute of Technology"></a>' +
          '<p>NAAC A++ (CGPA 3.66 / 4.0) <span aria-hidden="true">&middot;</span> NIRF 2025: 14th University, 14th Research, 16th Engineering</p>' +
        '</div>' +
        '<div class="footer-grid">' +
          '<div class="footer-intro"><a class="footer-brand" href="index.html">' + conference.name + '</a>' +
            '<p>The Third IEEE International Conference on Emerging Trends in Information Technology and Engineering, organized by SCORE at VIT Vellore.</p>' +
            '<address><span data-footer-address></span><br><a data-footer-email></a></address>' +
          '</div>' +
          '<div><h2>Conference Directory</h2><ul class="footer-links">' +
            '<li><a href="index.html">Home</a></li><li><a href="about.html">About VIT &amp; SCORE</a></li>' +
            '<li><a href="important-dates.html">Important Dates</a></li><li><a href="committees.html">Organizing Committees</a></li>' +
            '<li><a href="advisory.html">Advisory Board</a></li><li><a href="venue.html">Venue &amp; Travel</a></li>' +
            '<li><a href="events.html">Co-located Events</a></li><li><a href="keynote-speakers.html">Keynote Speakers</a></li>' +
            '<li><a href="contact.html">Contact &amp; Help Desk</a></li><li><a href="sponsorship.html">Sponsorships</a></li>' +
            '<li><a href="icetite20.html">ic-ETITE\'20 archive</a></li>' +
          '</ul></div>' +
          '<div><h2>Authors &amp; Papers</h2><ul class="footer-links">' +
            '<li><a href="call-for-papers.html">Call for Papers</a></li><li><a href="tracks.html">Research Tracks</a></li>' +
            '<li><a href="registration.html">Registration Fees</a></li><li><a href="visa.html">Visa &amp; Clearances</a></li>' +
            '<li><a href="call-for-papers.html#submit">Paper Submission Portal (EasyChair)</a></li>' +
            '<li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noopener">IEEE Xplore Indexing</a></li>' +
            '<li><a href="team.html">IEEE ITS Web Development Team</a></li>' +
          '</ul></div>' +
          '<div class="footer-chapters"><h2>Academic Host &amp; Chapter</h2><ul class="footer-links">' +
            '<li><a href="https://vit.ac.in/schools/school-of-computer-science-engineering-and-information-systems" target="_blank" rel="noopener">SCORE &middot; VIT Vellore</a></li>' +
            '<li><a href="https://ieee-its-1-tzbd.vercel.app/" target="_blank" rel="noopener">IEEE ITS VIT Student Chapter</a></li>' +
          '</ul><h2 class="footer-venue-heading">Venue &amp; Dates</h2><p data-footer-venue></p><p data-footer-dates></p></div>' +
        '</div>' +
        '<div class="footer-bottom"><span>&copy; 2028 ic-ETITE &middot; Vellore Institute of Technology</span><a href="team.html">Built by IEEE ITS Team</a></div>' +
      '</div></footer>';

    var address = footerMount.querySelector('[data-footer-address]');
    var email = footerMount.querySelector('[data-footer-email]');
    var venue = footerMount.querySelector('[data-footer-venue]');
    var dates = footerMount.querySelector('[data-footer-dates]');
    if (address) address.textContent = conference.address;
    if (email) {
      email.href = 'mailto:' + conference.email;
      email.textContent = conference.email;
    }
    if (venue) venue.textContent = conference.venue || 'Vellore Institute of Technology, Vellore';
    if (dates) dates.textContent = conference.dates;
  }

  document.documentElement.classList.add('js');

  var dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(function (item) {
    var toggle = item.querySelector('.menu-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var shouldOpen = !item.classList.contains('open');
      dropdowns.forEach(function (other) {
        other.classList.remove('open');
        var otherToggle = other.querySelector('.menu-toggle');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('open', shouldOpen);
      toggle.setAttribute('aria-expanded', String(shouldOpen));
    });
  });

  document.addEventListener('click', function (event) {
    if (event.target.closest('.has-dropdown')) return;
    dropdowns.forEach(function (item) {
      item.classList.remove('open');
      var toggle = item.querySelector('.menu-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    dropdowns.forEach(function (item) {
      item.classList.remove('open');
      var toggle = item.querySelector('.menu-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        if (document.activeElement === toggle) toggle.focus();
      }
    });
    var navLinks = document.getElementById('navLinks');
    var burger = document.getElementById('burgerBtn');
    if (navLinks) navLinks.classList.remove('open');
    if (burger) {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();
