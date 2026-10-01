function committeePeople(role, affiliation, names) {
  return names.map(function (name) {
    return { name: name, role: role, affiliation: affiliation };
  });
}

window.COMMITTEE = {
  chiefPatron: [{ name: 'Dr. G. Viswanathan', role: 'Chancellor', affiliation: 'VIT' }],
  patrons: [
    { name: 'Dr. Sankar Viswanathan', role: 'Vice President', affiliation: 'VIT' },
    { name: 'Dr. Sekar Viswanathan', role: 'Vice President', affiliation: 'VIT' },
    { name: 'Dr. G.V. Selvam', role: 'Vice President', affiliation: 'VIT' },
    { name: 'Dr. Sandhya Pentareddy', role: 'Executive Director', affiliation: 'VIT' },
    { name: 'Ms. Kadhambari S Viswanathan', role: 'Assistant Vice President', affiliation: 'VIT' },
    { name: 'Dr. V. S. Kanchana Bhaaskaran', role: 'Vice-Chancellor', affiliation: 'VIT' },
    { name: 'Dr. Partha Sharathi Mallick', role: 'Pro-Vice Chancellor', affiliation: 'VIT Vellore' },
    { name: 'Dr. Jayabarathi T', role: 'Registrar', affiliation: 'VIT' }
  ],
  organizingChair: committeePeople('Professor & Dean (i/c)', 'SCORE', ['Dr. Daphne Lopez']),
  organizingCoChair: committeePeople('Professor & Associate Dean', 'SCORE', ['Dr. Jeyanthi N']),
  conferenceChair: committeePeople('Professor', 'SCORE', ['Dr. John Singh K']),
  publicationChair: committeePeople('Associate Professor', 'SCORE', ['Dr. Vijayan R']),
  publicationCoChairs: committeePeople('Professor', 'SCORE', ['Dr. Brindha K', 'Dr. Deepa M']),
  financeChair: committeePeople('Associate Professor', 'SCORE', ['Dr. Priya M']),
  financeCoChair: committeePeople('Associate Professor', 'SCORE', ['Dr. Rajkumar M']),
  technicalProgrammeChairs: [
    { name: 'Dr. Priya V', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Krithika L B', role: 'Associate Professor', affiliation: 'SCORE' },
    { name: 'Dr. Senthil Kumar T', role: 'Associate Professor', affiliation: 'SCORE' },
    { name: 'Dr. Tamil Priya D', role: 'Assistant Professor', affiliation: 'SCORE' }
  ],
  publicationCommittee: committeePeople('Associate Professor', 'SCORE', ['Dr. Angulakshmi M', 'Dr. Parvathi R', 'Dr. Padmakumari P', 'Dr. Gayathri A']).concat(
    committeePeople('Assistant Professor', 'SCORE', ['Dr. Benjula Anbu Malar M B', 'Dr. Jagannathan J', 'Dr. Bhuvaneswari M S', 'Dr. Karthikeyan D', 'Dr. Anbarasa Kumar A', 'Dr. Yogaraja C A', 'Dr. Ayeswarya S'])
  ),
  sponsorshipCommittee: committeePeople('Associate Professor', 'SCORE', ['Dr. Vivekananda G N', 'Dr. Praveen Kumar Reddy']).concat(
    committeePeople('Assistant Professor', 'SCORE', ['Dr. Mohanraj G'])
  ),
  publicityAndMediaCommittee: committeePeople('Associate Professor', 'SCORE', ['Dr. Sumangali K', 'Dr. Asha N']),
  registrationCommittee: committeePeople('Associate Professor', 'SCORE', ['Dr. Santhi K', 'Dr. Seetha R', 'Dr. Bhuvana S']).concat(
    committeePeople('Assistant Professor', 'SCORE', ['Dr. Sivashankari R', 'Dr. Jenila Vincent M'])
  ),
  boltHackathon: [
    { name: 'Dr. J. Karthikeyan', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Brijendra Singh', role: 'Associate Professor', affiliation: 'SCORE' },
    { name: 'Dr. Krishnamoorthy N', role: 'Associate Professor', affiliation: 'SCORE' }
  ],
  technextExpoCommittee: committeePeople('Associate Professor', 'SCORE', ['Dr. Raghavan R']).concat(
    committeePeople('Assistant Professor', 'SCORE', ['Dr. Balaji E', 'Dr. Balasubramani M', 'Dr. Arun Kumar A'])
  ),
  eventManagementCommittee: committeePeople('Professor', 'SCORE', ['Dr. Srinivas Koppu', 'Dr. Vanmathi C', 'Dr. Mangayarkarasi R', 'Dr. Sudha M']).concat(
    committeePeople('Associate Professor', 'SCORE', ['Dr. Gundala Swathi', 'Dr. Chemmalar Selvi G'])
  ),
  guestCareCommittee: [
    { name: 'Dr. Dharmendra Singh Rajput', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Srinivasan P', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Magesh G', role: 'Assistant Professor', affiliation: 'SITE' }
  ],
  conferenceCoordinatingCommittee: committeePeople('Professor', 'SCORE', ['Dr. Hemalatha S', 'Dr. Anitha A', 'Dr. Pounambal M', 'Dr. Usha Devi G', 'Dr. Jagadeesh G']).concat(
    committeePeople('Associate Professor', 'SCORE', ['Dr. Kamalakannan J', 'Dr. Jayaram Reddy A', 'Dr. Mala Serene I', 'Dr. Nirmala M', 'Dr. Mythili N'])
  ),
  executiveAdvisoryCommittee: [
    { name: 'Dr. Arivuselvan K', role: 'HOD/IT', affiliation: 'SCORE' },
    { name: 'Dr. Thanapal P', role: 'HOD/SSE', affiliation: 'SCORE' },
    { name: 'Dr. Selvarani B', role: 'HOD/CSIS', affiliation: 'SCORE' },
    { name: 'Dr. Senthilkumar N', role: 'HOD/CA', affiliation: 'SCORE' },
    { name: 'Dr. Sumathy S', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Dinesh Babu L D', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Valarmathi B', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Nadesh R K', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Sujatha R', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Chiranji Lal Chowdhary', role: 'Professor', affiliation: 'SCORE' },
    { name: 'Dr. Ramya G', role: 'Associate Professor', affiliation: 'SCORE' }
  ]
};
