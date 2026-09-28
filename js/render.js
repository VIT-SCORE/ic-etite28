(function () {
  'use strict';

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderFees() {
    var mount = document.getElementById('registration-fees');
    if (!mount || !window.REGISTRATION_FEES) return;

    var wrapper = element('div', 'table-wrap');
    var table = element('table', 'table-custom');
    var caption = element('caption', 'visually-hidden', 'ic-ETITE\'28 registration fees');
    var header = element('thead');
    var headerRow = element('tr');
    ['Category', 'Indian authors and delegates (INR)', 'Foreign authors and delegates (USD)'].forEach(function (label) {
      var cell = element('th', '', label);
      cell.scope = 'col';
      headerRow.appendChild(cell);
    });
    header.appendChild(headerRow);

    var body = element('tbody');
    window.REGISTRATION_FEES.forEach(function (fee) {
      var row = element('tr');
      [fee.category, fee.indian, fee.foreign].forEach(function (value) {
        row.appendChild(element('td', '', value));
      });
      body.appendChild(row);
    });

    table.appendChild(caption);
    table.appendChild(header);
    table.appendChild(body);
    wrapper.appendChild(table);
    mount.replaceChildren(wrapper);
  }

  function renderCommittee() {
    var mount = document.getElementById('committee-data');
    if (!mount || !window.COMMITTEE) return;

    var labels = {
      chiefPatron: 'Chief Patron',
      patrons: 'Patrons',
      organizingChair: 'Organizing Chair',
      organizingCoChair: 'Organizing Co-chair',
      conferenceChair: 'Conference Chair',
      publicationChair: 'Publication Chair',
      publicationCoChairs: 'Publication Co-chairs',
      financeChair: 'Finance Chair',
      financeCoChair: 'Finance Co-chair',
      technicalProgrammeChairs: 'Technical Programme Chairs',
      publicationCommittee: 'Publication Committee',
      sponsorshipCommittee: 'Sponsorship Committee',
      publicityAndMediaCommittee: 'Publicity and Media Committee',
      registrationCommittee: 'Registration Committee',
      boltHackathon: 'BOLT 3.0 Hackathon',
      technextExpoCommittee: "Technext'28 Expo Committee",
      eventManagementCommittee: 'Event Management Committee',
      guestCareCommittee: 'Guest Care Committee',
      conferenceCoordinatingCommittee: 'Conference Coordinating Committee',
      executiveAdvisoryCommittee: 'Executive Advisory Committee'
    };

    var content = element('div', 'committee-data');
    Object.keys(labels).forEach(function (key) {
      var members = window.COMMITTEE[key] || [];
      if (!members.length) return;

      var group = element('section', 'committee-data-group');
      var heading = element('h2', '', labels[key]);
      var cards = element('div', 'card-grid');
      group.appendChild(heading);
      members.forEach(function (person) {
        var card = element('article', 'simple-card');
        var initials = person.name.replace(/^(Dr\\.|Prof\\.|Mr\\.|Ms\\.)\\s*/i, '').charAt(0);
        card.appendChild(element('div', 'avatar-ring', initials));
        card.appendChild(element('h4', '', person.name));
        card.appendChild(element('div', 'role', person.role));
        card.appendChild(element('p', '', person.affiliation));
        cards.appendChild(card);
      });
      group.appendChild(cards);
      content.appendChild(group);
    });

    mount.replaceChildren(content);
    var main = mount.closest('main');
    if (main) main.replaceChildren(mount);
  }

  function renderHomeDates() {
    var mount = document.getElementById('home-important-dates');
    if (!mount || !window.IMPORTANT_DATES) return;

    var list = element('ol', 'home-timeline');
    window.IMPORTANT_DATES.forEach(function (item) {
      var row = element('li', 'home-timeline-item');
      row.appendChild(element('strong', 'home-timeline-date', item.date));
      row.appendChild(element('span', 'home-timeline-milestone', item.milestone));
      if (item.note) row.appendChild(element('small', 'home-timeline-note', item.note));
      list.appendChild(row);
    });
    mount.replaceChildren(list);
  }

  function renderDateTable() {
    var mount = document.getElementById('important-dates-table');
    if (!mount || !window.IMPORTANT_DATES) return;

    var wrapper = element('div', 'table-wrap');
    var table = element('table', 'table-custom');
    var header = element('thead');
    var headerRow = element('tr');
    ['Milestone', 'Date'].forEach(function (label) {
      var cell = element('th', '', label);
      cell.scope = 'col';
      headerRow.appendChild(cell);
    });
    header.appendChild(headerRow);
    var body = element('tbody');
    window.IMPORTANT_DATES.forEach(function (item) {
      var row = element('tr');
      row.appendChild(element('td', '', item.milestone));
      row.appendChild(element('td', '', item.date));
      body.appendChild(row);
    });
    table.appendChild(header);
    table.appendChild(body);
    wrapper.appendChild(table);

    var content = element('div');
    content.appendChild(wrapper);
    if (window.IMPORTANT_DATES[0].note) {
      content.appendChild(element('p', 'form-note', window.IMPORTANT_DATES[0].note));
    }
    mount.replaceChildren(content);
  }

  function renderConferenceFacts() {
    if (!window.CONF) return;
    document.querySelectorAll('[data-conference-organiser]').forEach(function (node) {
      node.textContent = window.CONF.organiser;
    });
    document.querySelectorAll('[data-conference-dates]').forEach(function (node) {
      node.textContent = window.CONF.dates.replace('-', '–');
    });
    document.querySelectorAll('[data-conference-dates-short]').forEach(function (node) {
      node.textContent = window.CONF.dates.replace(' February ', ' Feb ').replace('-', '–');
    });
    document.querySelectorAll('[data-conference-supported-by]').forEach(function (node) {
      node.textContent = window.CONF.supportedBy.join(' · ');
    });
  }

  function renderEditionCard(edition) {
    var card = element('article', 'edition-card');
    var is2024 = edition.name.indexOf("'24") !== -1;
    var imageName = is2024 ? 'icetite24-inauguration.jpg' : 'icetite20-inauguration.jpg';
    var imageAlt = is2024
      ? "Dignitaries and keynote luminaries at ic-ETITE'24 inaugural session"
      : "VIT Chancellor presiding over the ic-ETITE'20 inaugural conclave";
    var image = element('img', 'edition-image');
    image.src = 'assets/images/' + imageName;
    image.alt = imageAlt;
    image.width = 828;
    image.height = 552;
    image.loading = 'lazy';
    card.appendChild(image);

    var body = element('div', 'edition-card-body');
    body.appendChild(element('div', 'section-tag', edition.edition.toUpperCase() + ' EDITION  ·  ' + edition.dates));
    body.appendChild(element('h3', '', 'Highlights of the ' + edition.edition + ' ' + edition.name));

    var summary = is2024
      ? 'Organized by SCORE, VIT Vellore; technically co-sponsored by IEEE Madras Section and supported by ACM.'
      : 'The inaugural edition was technically co-sponsored by IEEE Computer Society Madras Chapter and IEEE Communications Society Madras Chapter, and supported by ACM Madras Chapter.';
    body.appendChild(element('p', 'edition-summary', summary));

    var stats = element('dl', 'edition-stats');
    var metrics = is2024 ? [
      [edition.papers, 'Papers received'],
      [edition.countries, 'Countries'],
      [edition.participants, 'Participants'],
      [edition.technicalSessions, 'Technical sessions'],
      [edition.keynoteSessions, 'Keynote sessions'],
      [edition.boltRegistrations, 'BOLT 2.0 registrations']
    ] : [
      [edition.technicalSessions, 'Technical sessions'],
      [edition.keynoteSessions, 'Keynote sessions'],
      [edition.boltParticipants, 'Hackathon participants'],
      [edition.boltPrize, 'BOLT prize money'],
      [edition.presentedPapersPublishedBy, 'Presented papers published in']
    ];
    metrics.forEach(function (metric) {
      var item = element('div', 'edition-stat');
      item.appendChild(element('dt', '', String(metric[0])));
      item.appendChild(element('dd', '', metric[1]));
      stats.appendChild(item);
    });
    body.appendChild(stats);

    if (is2024) {
      body.appendChild(element('p', 'edition-detail', 'Chief Guest: ' + edition.chiefGuest));
      body.appendChild(element('p', 'edition-detail', 'Guest of Honour: ' + edition.guestOfHonour));
      body.appendChild(element('p', 'edition-detail', edition.technext + '.'));
      body.appendChild(element('p', 'edition-detail', 'Industry collaborators and sponsors: ' + edition.sponsors.join(', ') + '.'));
    } else {
      body.appendChild(element('p', 'edition-detail', 'Electronic ISBN: ' + edition.electronicISBN + ' · USB ISBN: ' + edition.usbISBN));
    }

    var proceedings = element('a', 'text-link', 'IEEE Xplore proceedings');
    proceedings.href = edition.proceedings;
    proceedings.target = '_blank';
    proceedings.rel = 'noopener';
    body.appendChild(proceedings);
    var historyLink = element('a', 'text-link edition-history-link', 'Read full ' + (is2024 ? '2024' : '2020') + ' details');
    historyLink.href = 'about.html#highlights';
    body.appendChild(historyLink);
    card.appendChild(body);
    return card;
  }

  function renderHomeEditions() {
    var mount = document.getElementById('previous-editions');
    if (!mount || !window.EDITIONS) return;

    var grid = element('div', 'edition-grid');
    window.EDITIONS.forEach(function (edition) {
      grid.appendChild(renderEditionCard(edition));
    });
    mount.replaceChildren(grid);
  }

  function initialize() {
    renderConferenceFacts();
    renderFees();
    renderCommittee();
    renderHomeDates();
    renderDateTable();
    renderHomeEditions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
