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
    var mount = document.getElementById('committee-app');
    if (!mount || !window.COMMITTEE || !window.ADVISORY) return;

    var groupLabels = {
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
    var committeeTabs = [
      { key: 'organizing', label: 'Organizing Committee', default: 'organizing', records: Object.keys(groupLabels).reduce(function (all, key) { return all.concat(window.COMMITTEE[key] || []); }, []) },
      { key: 'international', label: 'International Advisory', records: window.ADVISORY.international },
      { key: 'national', label: 'National Advisory', records: window.ADVISORY.national },
      { key: 'technical', label: 'Technical Committee', records: window.ADVISORY.technical }
    ];
    var activeKey = mount.dataset.active || 'organizing';
    var knownKeys = committeeTabs.map(function (tab) { return tab.key; });
    var initialView = 'list';
    try {
      if (window.localStorage.getItem('icEtiteCommitteeView') === 'cards') initialView = 'cards';
    } catch (error) {}

    function recordsForOrganizing(query) {
      var groups = [];
      Object.keys(groupLabels).forEach(function (key) {
        var people = (window.COMMITTEE[key] || []).filter(function (person) {
          return person.name.toLowerCase().indexOf(query) !== -1;
        });
        if (people.length) groups.push({ label: groupLabels[key], people: people });
      });
      return groups;
    }

    function renderCards(records) {
      var cards = element('div', 'card-grid');
      records.forEach(function (person) {
        var card = element('article', 'simple-card');
        var initials = person.name.replace(/^(Dr\\.|Prof\\.|Mr\\.|Ms\\.)\\s*/i, '').charAt(0);
        card.appendChild(element('div', 'avatar-ring', initials));
        card.appendChild(element('h4', '', person.name));
        card.appendChild(element('div', 'role', person.role));
        card.appendChild(element('p', '', person.affiliation));
        cards.appendChild(card);
      });
      return cards;
    }

    function renderContacts() {
      var block = element('section', 'committee-contact-block');
      block.appendChild(element('h2', '', 'Conference Contacts'));
      var grid = element('div', 'committee-contact-grid');
      (window.CONTACTS || []).forEach(function (contact) {
        var card = element('article', 'committee-contact-card');
        card.appendChild(element('span', 'contact-role', contact.role));
        card.appendChild(element('h3', '', contact.name));
        card.appendChild(element('p', '', contact.designation));
        var links = element('div', 'committee-contact-links');
        var email = element('a', '', contact.email);
        email.href = 'mailto:' + contact.email;
        links.appendChild(email);
        var phone = element('a', '', contact.phone);
        phone.href = 'tel:' + contact.phone.replace(/[^+\\d]/g, '');
        links.appendChild(phone);
        card.appendChild(links);
        grid.appendChild(card);
      });
      block.appendChild(grid);
      return block;
    }

    function buildPanel(tab) {
      var panel = element('div', 'committee-tabpanel');
      panel.id = 'committee-panel-' + tab.key;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'committee-tab-' + tab.key);
      panel.tabIndex = 0;

      var searchRow = element('div', 'committee-search-row');
      var label = element('label', '', 'Search names');
      var search = element('input', 'committee-search');
      search.type = 'search';
      search.placeholder = 'Filter names';
      search.setAttribute('aria-label', 'Search names in ' + tab.label);
      label.appendChild(search);
      var count = element('p', 'committee-count');
      count.setAttribute('aria-live', 'polite');
      searchRow.appendChild(label);
      searchRow.appendChild(count);
      panel.appendChild(searchRow);

      var results = element('div', 'committee-results');
      panel.appendChild(results);

      function update(query) {
        query = query.trim().toLowerCase();
        if (tab.key === 'organizing') {
          var groups = recordsForOrganizing(query);
          var shown = groups.reduce(function (total, group) { return total + group.people.length; }, 0);
          count.textContent = 'Showing ' + shown + ' of ' + tab.records.length;
          results.replaceChildren();
          groups.forEach(function (group) {
            var section = element('div', 'committee-data-group');
            section.appendChild(element('h3', '', group.label));
            section.appendChild(renderCards(group.people));
            results.appendChild(section);
          });
          return;
        }
        var filtered = tab.records.filter(function (person) { return person.name.toLowerCase().indexOf(query) !== -1; });
        count.textContent = 'Showing ' + filtered.length + ' of ' + tab.records.length;
        results.replaceChildren(renderCards(filtered));
      }

      search.addEventListener('input', function () { update(search.value); });
      update('');
      return panel;
    }

    var shell = element('div', 'committee-tabs-component');
    shell.appendChild(renderContacts());
    var viewToolbar = element('div', 'committee-view-toolbar');
    var viewToggle = element('div', 'committee-view-toggle');
    viewToggle.setAttribute('role', 'group');
    viewToggle.setAttribute('aria-label', 'Committee view');
    var listButton = element('button', 'committee-view-button', 'List');
    listButton.type = 'button';
    var cardsButton = element('button', 'committee-view-button', 'Cards');
    cardsButton.type = 'button';
    function setView(view, persist) {
      var isList = view === 'list';
      mount.classList.toggle('view-list', isList);
      mount.classList.toggle('view-cards', !isList);
      listButton.setAttribute('aria-pressed', String(isList));
      cardsButton.setAttribute('aria-pressed', String(!isList));
      if (persist) {
        try {
          window.localStorage.setItem('icEtiteCommitteeView', isList ? 'list' : 'cards');
        } catch (error) {}
      }
    }
    listButton.setAttribute('aria-pressed', 'false');
    cardsButton.setAttribute('aria-pressed', 'false');
    listButton.addEventListener('click', function () { setView('list', true); });
    cardsButton.addEventListener('click', function () { setView('cards', true); });
    viewToggle.appendChild(listButton);
    viewToggle.appendChild(cardsButton);
    viewToolbar.appendChild(viewToggle);
    setView(initialView, false);
    shell.appendChild(viewToolbar);
    var tabList = element('div', 'committee-tabs');
    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('aria-label', 'Conference committees');
    var panels = element('div', 'committee-tabpanels');

    function activate(key, updateHash) {
      if (knownKeys.indexOf(key) === -1) key = mount.dataset.active === 'international' ? 'international' : 'organizing';
      activeKey = key;
      committeeTabs.forEach(function (tab) {
        var button = tabList.querySelector('#committee-tab-' + tab.key);
        var panel = panels.querySelector('#committee-panel-' + tab.key);
        var selected = tab.key === activeKey;
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
        button.classList.toggle('active', selected);
        panel.hidden = !selected;
        if (selected) {
          var search = panel.querySelector('.committee-search');
          if (search && search.value) {
            search.value = '';
            search.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      });
      if (updateHash && window.location.hash !== '#' + key) window.location.hash = key;
    }

    committeeTabs.forEach(function (tab, index) {
      var button = element('button', 'committee-tab', tab.label);
      button.type = 'button';
      button.id = 'committee-tab-' + tab.key;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', 'committee-panel-' + tab.key);
      button.setAttribute('aria-selected', 'false');
      button.tabIndex = -1;
      button.addEventListener('click', function () { activate(tab.key, true); });
      button.addEventListener('keydown', function (event) {
        var nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % committeeTabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index + committeeTabs.length - 1) % committeeTabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = committeeTabs.length - 1;
        else return;
        event.preventDefault();
        var nextTab = committeeTabs[nextIndex];
        tabList.querySelector('#committee-tab-' + nextTab.key).focus();
        activate(nextTab.key, true);
      });
      tabList.appendChild(button);
      panels.appendChild(buildPanel(tab));
    });

    shell.appendChild(tabList);
    shell.appendChild(panels);
    mount.replaceChildren(shell);
    var initialKey = window.location.hash.slice(1) || mount.dataset.active || 'organizing';
    activate(initialKey, !window.location.hash && mount.dataset.active === 'international');
    window.addEventListener('hashchange', function () { activate(window.location.hash.slice(1), false); });
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
