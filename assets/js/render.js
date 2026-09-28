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

  function initialize() {
    renderFees();
    renderCommittee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
