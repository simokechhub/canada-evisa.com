import type { Dictionary, LegalBlock } from '@/lib/dictionary/fr'

export const en: Dictionary = {
  meta: {
    title: 'Canada eVisa: Electronic Travel Authorization (eTA)',
    description:
      'Canada eVisa: visa-exempt travellers flying to Canada need an electronic travel authorization (eTA), not a visa. Guided online application, checked for you.',
    keywords: [
      'Canada eVisa',
      'Canada eTA',
      'Canada electronic travel authorization',
      'Canada visa',
      'eTA application Canada',
    ],
    ogDescription:
      'Citizens of visa-exempt countries need an eTA to fly to Canada. Guided online form, application checked before submission.',
    twitterDescription: 'Guided form, application checked before submission.',
  },

  nav: {
    apply: 'Apply',
    requirements: 'Requirements',
    nationalities: 'By nationality',
    guides: 'Guides',
    faq: 'FAQ',
  },

  actions: {
    start: 'Start my application',
    seeRequirements: 'See the requirements',
    seeFullList: 'See the full list',
    allQuestions: 'All questions',
    allNationalities: 'See all {count} nationalities',
    viewPage: 'View the page',
    backHome: 'Back to the home page',
    allGuides: 'All guides',
    readGuide: 'Read the guide',
    checkMyNationality: 'Check the rules for my nationality',
  },

  header: {
    logoAria: '{name} — back to the home page',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    switchLanguage: 'View this page in French',
  },

  banner: {
    strong: 'Private, non-government website.',
    text: 'You can also apply directly on canada.ca for CAD 7:',
    link: 'official website',
  },

  disclaimer:
    'This site is a private application-assistance and checking service. It is neither the Government of Canada website nor a consular service. You can apply for an eTA yourself on canada.ca, the only official website, for CAD 7.',

  hours: 'by email',

  confirmationEmail: {
    subject: 'We have received your application {reference}',
    greeting: 'Hello {name},',
    intro:
      'We have received your Canada electronic travel authorization (eTA) application and your payment of {amount}.',
    referenceLabel: 'Your reference',
    nextTitle: 'What happens next',
    nextText:
      'An adviser checks every field before the application is submitted. We will email you if anything needs correcting, so keep an eye on your inbox, including the spam folder.',
    trackLabel: 'Track my application',
    questions: 'Any questions? Simply reply to this email.',
    signature: 'The {siteName} team',
  },

  footer: {
    tagline:
      'Clear guidance for preparing your Canada electronic travel authorization. Our team is available {hours}.',
    columns: {
      process: 'The process',
      info: 'Information',
      site: 'This site',
    },
    links: {
      apply: 'Apply',
      requirements: 'Requirements',
      tracking: 'Track my application',
      guides: 'Travel guides',
      faq: 'Frequently asked questions',
      nationalities: 'All nationalities',
      contact: 'Contact us',
      legalNotice: 'Legal notice',
      privacy: 'Privacy',
      terms: 'Terms of service',
    },
    popular: 'Most visited pages',
    independenceTitle: 'A private service, independent of the Government of Canada',
    officialPortal: 'Official website',
    rights: 'All rights reserved.',
    emailLabel: 'Email address',
  },

  breadcrumb: {
    home: 'Home',
    aria: 'Breadcrumb',
  },

  trust: [
    { value: '5 min', label: 'to complete your application' },
    { value: 'Online', label: 'on phone, tablet or computer' },
    { value: 'Checked', label: 'before submission' },
    { value: '{count}', label: 'guides by nationality' },
  ],

  steps: [
    {
      title: 'Complete the form',
      description:
        'Enter your details exactly as they appear on your passport: identity, birth, address and passport information.',
    },
    {
      title: 'We check the application',
      description:
        'An adviser checks every field, especially the passport number, the most common source of errors, and contacts you if anything needs correcting.',
    },
    {
      title: 'The application is submitted',
      description:
        'Once checked, the application is submitted to Immigration, Refugees and Citizenship Canada (IRCC), which alone makes the decision.',
    },
    {
      title: 'You receive the answer',
      description:
        'Most eTA applications are approved within minutes. Some require additional documents: we let you know by email.',
    },
  ],

  requirements: [
    {
      title: 'A passport from a visa-exempt country',
      description:
        'The eTA is electronically linked to this passport. It must be valid, and it is the passport you will show when boarding.',
      mandatory: true,
    },
    {
      title: 'A valid email address',
      description:
        'The answer and any request for additional documents arrive by email. Check the spelling and keep an eye on your spam folder.',
      mandatory: true,
    },
    {
      title: 'Your personal details',
      description:
        'Names, date and place of birth, nationality, address and phone number, as shown on your documents.',
      mandatory: true,
    },
    {
      title: 'A payment card',
      description: 'Payment is made online by card, securely.',
      mandatory: true,
    },
    {
      title: 'Additional documents',
      description:
        'In some cases, IRCC asks for additional documents. Instructions are then sent by email, usually within 72 hours.',
      mandatory: false,
    },
    {
      title: 'A Canadian passport if you are also Canadian',
      description:
        'Dual Canadian citizens cannot use an eTA: they must travel with a valid Canadian passport.',
      mandatory: false,
    },
  ],

  optionalTag: 'if applicable',

  faqs: [
    {
      question: 'What is the Canada eTA?',
      answer:
        'The electronic travel authorization (eTA) is an entry requirement for citizens of visa-exempt countries who fly to or through Canada. It is electronically linked to your passport.',
    },
    {
      question: 'Does Canada require a visa or an "eVisa"?',
      answer:
        'Not for citizens of visa-exempt countries such as the UK, France or Australia: they only need an eTA to travel by air. Nationals of other countries generally need a visitor visa, which is a different process.',
    },
    {
      question: 'How long does it take to get an eTA?',
      answer:
        'Most applications are approved within minutes. Some require additional documents, and instructions are then sent by email, usually within 72 hours. Apply as soon as your trip is planned, ideally before booking your flights.',
    },
    {
      question: 'How long is the eTA valid?',
      answer:
        'It is generally valid for up to five years, or until the passport expires if that comes first, for an unlimited number of trips. The length of each stay is set by the border services officer on arrival.',
    },
    {
      question: 'Do children need an eTA?',
      answer:
        'Yes. Every traveller needs their own eTA, including children and infants, with their own passport.',
    },
    {
      question: 'Do I need an eTA to enter Canada by land or sea?',
      answer:
        'In most cases, no: the eTA is required for air travel. Arriving by car, bus, train or boat from the United States generally does not require one, but a passport is still needed.',
    },
    {
      question: 'Do US citizens need an eTA?',
      answer:
        'No. US citizens are exempt. US lawful permanent residents have also been exempt since April 26, 2022, provided they present their passport and a valid green card.',
    },
    {
      question: 'Can I apply myself?',
      answer:
        'Yes. The official application is on canada.ca for CAD 7. Our service is optional: you pay for the application check and support, on top of the official fee.',
    },
  ],

  templates: {
    A: {
      label: 'Nonstop flights to Canada',
      summary:
        'Travellers from {country} can fly nonstop to major Canadian cities. As nationals of a visa-exempt country, they need an eTA to board.',
      focus: [
        {
          title: 'Get the eTA before you book',
          body: 'Most answers arrive within minutes, but some require additional documents. Plan ahead so you are not refused boarding.',
        },
        {
          title: 'The right passport, the right number',
          body: 'The eTA is linked to the passport entered in the application. Travel with that same passport and check every character of the number, without mixing up the letter O and the digit 0.',
        },
      ],
    },
    B: {
      label: 'Itinerary with a connection',
      summary:
        'From {country}, most routes to Canada connect through a major European hub. The eTA is required when boarding the flight to Canada.',
      focus: [
        {
          title: 'One eTA, whatever the route',
          body: 'A connection changes nothing: a valid eTA is all you need to board for Canada, whether the flight is nonstop or not.',
        },
        {
          title: 'Check the connecting country’s rules',
          body: 'Depending on where you change planes, other formalities may apply. Check with your airline before booking.',
        },
      ],
    },
    C: {
      label: 'Long-haul, sometimes via the US',
      summary:
        'From {country}, the trip to Canada is long-haul. Some routes connect in the United States, which adds a US formality to the Canadian eTA.',
      focus: [
        {
          title: 'US connection: one more formality',
          body: 'A connection on US soil requires a US authorization (ESTA or visa, depending on nationality) in addition to the eTA. A nonstop flight avoids it.',
        },
        {
          title: 'Mind the time difference',
          body: 'Booking dates follow local time: an evening departure can land in Canada on the same day, or even the day before.',
        },
      ],
    },
  },

  cta: {
    title: 'Do you have your passport to hand?',
    description:
      'You can start now. The form takes about five minutes, then an adviser checks the details before submission.',
  },

  home: {
    heroBadge: 'Online form with an application review',
    heroTitle: 'Canada eVisa: apply for your electronic travel authorization',
    heroText:
      'Citizens of visa-exempt countries do not need a visa for Canada, but must obtain an eTA before flying. Complete your application online: we check every detail before submission.',
    heroBullets: [
      'A clear, guided form in English',
      'Human review before submission',
      'Updates and confirmations by email',
    ],
    stepsEyebrow: 'The process',
    stepsTitle: 'A clear process, from form to answer',
    stepsText:
      'You enter your details and passport information. We check the application before it is submitted to IRCC.',
    requirementsEyebrow: 'Requirements',
    requirementsTitle: 'Canada eVisa requirements: what to have ready',
    requirementsText:
      'No tickets or bookings to upload: your passport, an email address and a few personal details are enough.',
    nationalitiesEyebrow: 'By nationality',
    nationalitiesTitle: 'Canada eVisa rules by nationality',
    nationalitiesText:
      'Review the requirements, flights to Canada and points to check before departure.',
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'Canada eVisa: answers to common questions',
  },

  applyPage: {
    title: 'Your Canada eTA application',
    metaTitle: 'Apply for a Canada eTA',
    metaDescription:
      'Complete your Canada electronic travel authorization application in a few guided steps. Application checked before submission.',
    intro: 'A few guided steps. Your entries stay temporarily in this tab until secure payment.',
    introLink: 'Check the requirements first',
  },

  requirementsPage: {
    metaTitle: 'Canada eTA requirements',
    metaDescription:
      'A passport from a visa-exempt country, an email address, personal details: everything you need to apply for a Canada eTA.',
    title: 'Canada eTA requirements',
    intro:
      'The eTA is required for citizens of visa-exempt countries who fly to or through Canada. It is checked at boarding, then a border services officer decides on entry at arrival.',
    listEyebrow: 'To prepare',
    listTitle: 'What a complete application needs',
    mistakesEyebrow: 'Common mistakes',
    mistakesTitle: 'Four common mistakes to avoid',
    mistakes: [
      {
        title: 'A mistyped passport number',
        body: 'This is the most common mistake. An eTA linked to the wrong number will not let you board: check every character, telling the letter O apart from the digit 0.',
      },
      {
        title: 'The wrong passport',
        body: 'If you hold several nationalities, use the passport you will travel with. Dual Canadian citizens must travel with a Canadian passport.',
      },
      {
        title: 'A passport renewed after applying',
        body: 'The eTA is linked to one specific passport. If you get a new one, you must apply for a new eTA before you travel.',
      },
      {
        title: 'A wrong email address',
        body: 'The answer and any document requests arrive by email. One missing letter, and nothing reaches you.',
      },
    ],
    nextEyebrow: 'After applying',
    nextTitle: 'What happens next',
  },

  nationalitiesPage: {
    metaTitle: 'Canada eVisa by nationality',
    metaDescription:
      'Canada eTA rules by nationality: requirements, flights to Canada, connections and points to watch.',
    title: 'Requirements by nationality',
    intro:
      'The eTA is required for citizens of visa-exempt countries, but flights, connections and points to watch vary from one country to another. {count} detailed guides are available.',
    countryCount: '{count} countries',
    ctaTitle: 'Is your country not listed?',
    ctaText:
      'Write to us: we check whether your nationality needs an eTA or a visitor visa before you do anything.',
    cardText: 'Canada eTA: requirements and steps for {demonym} travellers.',
  },

  nationalityPage: {
    metaTitle: 'Canada eVisa for {demonym} Citizens',
    metaDescription:
      'Canada eTA for {nationality} nationals: requirements, passport, flights to Canada and points to watch.',
    title: 'Canada eVisa (eTA): rules for {demonym} travellers',
    facts: {
      nationality: 'Nationality',
      authorisation: 'eTA',
      required: 'Required for air travel',
      officialFee: 'Official IRCC fee',
      flightDuration: 'Flying time to Canada',
      timezone: 'Time difference',
      currency: 'Currency at departure',
    },
    beforeEyebrow: 'From {country}',
    beforeTitle: 'What to check before departure',
    flightsTitle: 'Your flights to Canada',
    routeText:
      'Schedules and routes from {country} can change. Check the full itinerary with the airline, including the formalities of every connecting country.',
    airportsTitle: 'Departure airports',
    carriersTitle: 'Airlines flying to Canada',
    highSeasonStrong: 'High season:',
    highSeasonText: '{season}. Book early during these busy periods.',
    passportTitle: 'Your passport',
    healthTitle: 'Health',
    healthRequired:
      'Check the health recommendations that apply to travellers arriving from {country} before departure.',
    healthNotRequired:
      'No vaccination certificate is required to enter Canada from {country}. Travel insurance is still strongly recommended: healthcare is expensive for visitors.',
    watchTitle: 'Point to watch',
    docsEyebrow: 'To prepare',
    docsTitle: 'The application of a {nationality} national',
    stepsEyebrow: 'How it works',
    stepsTitle: 'How the application unfolds',
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'What {demonym} travellers often ask us',
    faqMore: 'All questions',
    countryFaq: {
      authorisationQ: 'Do {demonym} travellers need an eTA for Canada?',
      authorisationA:
        'Yes, for air travel. {nationality} nationals are visa-exempt but must obtain an eTA before boarding a flight to or through Canada. By land or sea, it is generally not required.',
      flightQ: 'How long is the flight from {country}?',
      flightA: '{flightDuration}. {flightInfo}',
      carriersQ: 'Which airlines fly from {country} to Canada?',
      carriersA:
        'From {airports}, flights to Canada are operated by airlines including {carriers}. Routes change, so check the full itinerary with the airline.',
      healthQ: 'Do I need a vaccination to enter Canada from {country}?',
      transitQ: 'What should I watch out for during the connection?',
      timezoneQ: 'What is the time difference between {country} and Canada?',
      timezoneA: '{timezone}. Canada spans six time zones: check the one for your arrival city.',
      seasonQ: 'When are seats hardest to find from {country}?',
      seasonA:
        'Busiest period for departures from {country}: {season}. Apply for the eTA as soon as the trip is decided, even before booking.',
      passportQ: 'Which passport do I need to apply for the eTA?',
      usTripQ: 'Can I combine Canada and the United States from {country}?',
      plugsQ: 'Do I need a plug adapter for Canada?',
      languageQ: 'What language is spoken in Canada?',
      tripQ: 'What to see in Canada when travelling from {country}?',
    },
    goodToKnowEyebrow: 'Good to know',
    goodToKnowTitle: 'Travelling to Canada from {country}',
    languageTitle: 'Language',
    plugsTitle: 'Electricity',
    usTripTitle: 'Combining with the United States',
    specialTitle: 'Special case',
    tripIdeaTitle: 'Trip idea from {country}',
    guidesEyebrow: 'Go further',
    guidesTitle: 'Guides to plan your trip',
    relatedEyebrow: 'Other nationalities',
    relatedTitle: 'Keep reading',
    ctaTitle: 'Ready to apply for your eTA from {country}?',
    ctaText:
      'An adviser checks every field before submission. You are told as soon as anything needs correcting.',
  },

  faqPage: {
    metaTitle: 'Canada eTA frequently asked questions',
    metaDescription:
      'Processing time, validity, children, land travel, US citizens: answers to the most common questions about the Canada eTA.',
    title: 'Frequently asked questions',
    intro: 'Can’t find your answer?',
    introLink: 'Write to us',
    introEnd: ' and an adviser will reply by email.',
  },

  guidesPage: {
    metaTitle: 'Canada travel guides',
    metaDescription:
      'Seasons, eTA application and choosing your cities: our guides for planning a trip to Canada without surprises.',
    title: 'Travel guides',
    intro: 'Practical articles written for travellers and updated as the entry rules change.',
    reading: '{time} read',
    breadcrumbArticle: 'Article',
    relatedTitle: 'Also worth reading',
  },

  contactPage: {
    metaTitle: 'Contact us',
    metaDescription: 'A question about your Canada eTA application or an application in progress? Send a secure message to our team and get a reply by email.',
    title: 'Contact us',
    intro:
      'We reply by email as soon as possible. For a question about an application in progress, include the reference you received after payment.',
    emailTitle: 'By email',
    emailReply: 'We reply as soon as possible.',
    addressTitle: 'Postal address',
    urgentTitle: 'Imminent departure',
    urgentText:
      'Leaving in less than 72 hours? Write “Urgent” and your departure date. This does not shorten IRCC’s processing time.',
  },

  contactForm: {
    title: 'Write to an adviser',
    name: 'Full name',
    email: 'Email address',
    subject: 'Subject',
    reference: 'Application reference',
    optional: '(optional)',
    message: 'Your message',
    subjects: {
      question: 'Question before applying',
      file: 'Application in progress',
      refusal: 'Refused application',
      billing: 'Billing',
      other: 'Other',
    },
    warning:
      'Do not include card numbers or passwords in this message. To send a document, wait for our reply by email.',
    submit: 'Send message',
    errors: {
      name: 'Enter your name.',
      email: 'Enter a valid email address.',
      message: 'Describe your request in a few sentences (at least 20 characters).',
    },
    sentTitle: 'Message received',
    sentText: 'Your message has been saved securely. Our team will reply to the email address provided.',
    sentBack: 'Back to the form',
  },

  trackingPage: {
    metaTitle: 'Track my application',
    metaDescription: 'Check the progress of your Canada eTA application using your application reference.',
    title: 'Track my application',
    intro:
      'Enter the reference shown after payment and the email address used for the application. If you do not have your reference,',
    introLink: 'contact an adviser',
    statesTitle: 'The four stages of an application',
    states: [
      { label: 'Received', body: 'Your application and payment have reached us.' },
      { label: 'Under review', body: 'An adviser checks every field of the application.' },
      { label: 'Submitted to IRCC', body: 'The application is with the Canadian authorities.' },
      { label: 'Decision received', body: 'The answer is sent to you by email.' },
    ],
  },

  trackingForm: {
    title: 'Find my application',
    reference: 'Application reference',
    email: 'Application email address',
    submit: 'Show my application status',
    error: 'Enter the APP reference received after payment and the email address used for the application.',
    resultTitle: 'Application status',
    resultText: 'The status shown comes from your saved application.',
  },

  notFound: {
    metaTitle: 'Page not found',
    eyebrow: 'Error 404',
    title: 'This page does not exist',
    text: 'The link may be out of date. Start again from the home page or go straight to the page for your nationality.',
  },

  legal: {
    updatedLabel: 'Last updated:',
    updatedAt: 'September 23, 2026',
    notice: {
      metaTitle: 'Legal notice',
      metaDescription: 'Legal notice of canada-evisa.com: publisher, registered office, nature of this private eTA assistance service and intellectual property.',
      title: 'Legal notice',
      blocks: [
        { kind: 'heading', text: 'Nature of the service' },
        { kind: 'paragraph', text: '{disclaimer}' },
        {
          kind: 'paragraph',
          text: 'The service consists of paid assistance with preparing and checking the eTA application. The decision to grant or refuse the eTA, and entry to Canada, rests solely with the Canadian authorities.',
        },
        { kind: 'heading', text: 'Publisher' },
        {
          kind: 'list',
          items: [
            'Company name: {legalName}',
            'Legal form: Limited Liability Company (LLC)',
            'Registered office: {address}',
          ],
        },
        { kind: 'contact' },
        { kind: 'heading', text: 'Intellectual property' },
        {
          kind: 'paragraph',
          text: 'Unless stated otherwise, all content on this site is protected by copyright. Reproduction without prior written permission is prohibited.',
        },
        { kind: 'heading', text: 'External links' },
        {
          kind: 'paragraph',
          text: 'The link to the official canada.ca website is provided for information. We have no control over its content.',
        },
      ] as LegalBlock[],
    },
    privacy: {
      metaTitle: 'Privacy policy',
      metaDescription: 'What data is collected, why, how long it is kept and how to exercise your rights.',
      title: 'Privacy policy',
      blocks: [
        { kind: 'heading', text: 'Data controller' },
        { kind: 'paragraph', text: '{legalName}, {address}.' },
        { kind: 'contact' },
        { kind: 'heading', text: 'Data collected' },
        {
          kind: 'list',
          items: [
            'Identity: names, gender, date and place of birth, nationality.',
            'Passport: number, issuing country, issue and expiry dates.',
            'Contact details: address, email address, phone number.',
            'Billing: amount and payment history.',
          ],
        },
        { kind: 'heading', text: 'Purposes and legal bases' },
        {
          kind: 'paragraph',
          text: 'Identity and passport data are processed to perform the assistance contract you enter into with us and to submit your application to the Canadian authorities. Billing data is kept to meet legal accounting obligations.',
        },
        { kind: 'heading', text: 'Draft saved in your browser' },
        {
          kind: 'paragraph',
          text: 'The form temporarily keeps the fields you enter in the tab’s session storage. The draft is deleted after payment is confirmed or when the tab is closed.',
        },
        { kind: 'heading', text: 'Recipients' },
        {
          kind: 'paragraph',
          text: 'Your data is sent to Immigration, Refugees and Citizenship Canada (IRCC) to process your eTA, and to our technical providers (hosting, email, payment, live chat), who are bound by confidentiality commitments.',
        },
        { kind: 'heading', text: 'Retention' },
        {
          kind: 'paragraph',
          text: 'Application data is kept only as long as needed to provide the service, follow up the application and meet legal obligations. Payment data and accounting records are kept for the applicable legal period.',
        },
        { kind: 'heading', text: 'Your rights' },
        {
          kind: 'paragraph',
          text: 'You have the right to access, rectify, erase, restrict, object and port your data. You may also contact the competent data protection authority.',
        },
        { kind: 'heading', text: 'Cookies' },
        {
          kind: 'paragraph',
          text: 'This site sets no advertising cookies. Only cookies needed for the site to work, including those of the live chat, may be used.',
        },
      ] as LegalBlock[],
    },
    terms: {
      metaTitle: 'Terms of service',
      metaDescription: 'Purpose of the service, prices, timing, customer obligations, cancellation and liability.',
      title: 'Terms of service',
      blocks: [
        { kind: 'heading', text: '1. Purpose' },
        {
          kind: 'paragraph',
          text: '{legalName} provides a paid service assisting with the preparation, checking and submission of Canada electronic travel authorization (eTA) applications. {disclaimer}',
        },
        { kind: 'heading', text: '2. Prices' },
        {
          kind: 'paragraph',
          text: 'Prices include the official fee paid to the Government of Canada and our service fee, per traveller:',
        },
        { kind: 'plans' },
        { kind: 'heading', text: '3. Customer obligations' },
        {
          kind: 'paragraph',
          text: 'You guarantee that the information provided is accurate, especially your passport details. Incorrect information may lead to a refusal or denied boarding, for which we cannot be held responsible.',
        },
        { kind: 'heading', text: '4. Timing' },
        {
          kind: 'paragraph',
          text: 'The check starts after payment. The decision time depends on IRCC: most applications are processed within minutes, others require additional documents. No issue date is guaranteed.',
        },
        { kind: 'heading', text: '5. Cancellation' },
        {
          kind: 'paragraph',
          text: 'The service starts after payment so the application can be checked without delay. Any mandatory cancellation or withdrawal rights under the law applicable to the customer remain unaffected.',
        },
        { kind: 'heading', text: '6. Refusal' },
        {
          kind: 'paragraph',
          text: 'If the application is refused, we share the information received and the possible next steps. The official fee is non-refundable.',
        },
        { kind: 'heading', text: '7. Liability' },
        {
          kind: 'paragraph',
          text: 'Our liability is limited to the service fees received. We cannot be held responsible for denied boarding, a decision of the Canadian authorities, or the consequences of a cancelled trip.',
        },
        { kind: 'heading', text: '8. Governing law and disputes' },
        {
          kind: 'paragraph',
          text: 'These terms are governed by the rules applicable to {legalName}, without depriving consumers of the mandatory protections of their country of residence. Any complaint may first be sent to customer service for review.',
        },
        { kind: 'contact' },
      ] as LegalBlock[],
    },
  },
}
