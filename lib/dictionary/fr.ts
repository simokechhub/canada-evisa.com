export type LegalBlock =
  | { kind: 'callout'; strong: string; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'contact' }
  | { kind: 'plans' }

export const fr = {
  meta: {
    title: 'AVE Canada : autorisation de voyage électronique (eTA)',
    description:
      "AVE Canada (eTA) : pas de visa pour les pays dispensés, mais une autorisation de voyage électronique obligatoire en avion. Demande en ligne vérifiée.",
    keywords: [
      'AVE Canada',
      'eTA Canada',
      'visa Canada',
      'Canada eVisa',
      'autorisation de voyage électronique Canada',
    ],
    ogDescription:
      "Les citoyens des pays dispensés de visa ont besoin d'une AVE pour prendre l'avion vers le Canada. Formulaire guidé, dossier vérifié avant envoi.",
    twitterDescription: 'Formulaire guidé et dossier vérifié avant envoi.',
  },

  nav: {
    apply: 'Faire une demande',
    requirements: 'Conditions requises',
    nationalities: 'Par nationalité',
    guides: 'Guides',
    faq: 'FAQ',
  },

  actions: {
    start: 'Commencer ma demande',
    seeRequirements: 'Voir les conditions requises',
    seeFullList: 'Voir la liste complète',
    allQuestions: 'Toutes les questions',
    allNationalities: 'Voir les {count} nationalités',
    viewPage: 'Voir la page',
    backHome: "Retour à l'accueil",
    allGuides: 'Tous les guides',
    readGuide: 'Lire le guide',
    checkMyNationality: 'Vérifier les règles de ma nationalité',
  },

  header: {
    logoAria: "{name} — retour à l'accueil",
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    skipToContent: 'Aller au contenu principal',
    mainNav: 'Navigation principale',
    mobileNav: 'Navigation mobile',
    switchLanguage: 'Voir cette page en anglais',
  },

  disclaimer:
    "Ce site est un service privé d'assistance et de vérification de demandes. Il n'est ni le site du gouvernement du Canada, ni un service consulaire.",

  hours: 'par e-mail',

  /** E-mail envoyé au client une fois le paiement confirmé. */
  confirmationEmail: {
    subject: 'Votre demande {reference} a bien été reçue',
    greeting: 'Bonjour {name},',
    intro:
      "Nous avons bien reçu votre demande d'autorisation de voyage électronique (AVE) pour le Canada, ainsi que votre paiement de {amount}.",
    referenceLabel: 'Votre référence',
    nextTitle: 'La suite',
    nextText:
      "Un conseiller vérifie chaque champ avant l'envoi de la demande. Nous vous écrivons si une information doit être corrigée : surveillez vos e-mails, y compris le dossier des indésirables.",
    trackLabel: 'Suivre mon dossier',
    questions: 'Une question ? Répondez simplement à cet e-mail.',
    signature: "L'équipe {siteName}",
  },

  footer: {
    tagline:
      "Un accompagnement clair pour préparer votre autorisation de voyage électronique pour le Canada. Notre équipe est disponible {hours}.",
    columns: {
      process: 'Démarche',
      info: 'Informations',
      site: 'Le site',
    },
    links: {
      apply: 'Faire une demande',
      requirements: 'Conditions requises',
      tracking: 'Suivre mon dossier',
      guides: 'Guides de voyage',
      faq: 'Questions fréquentes',
      nationalities: 'Toutes les nationalités',
      contact: 'Nous contacter',
      legalNotice: 'Mentions légales',
      privacy: 'Confidentialité',
      terms: 'Conditions générales',
    },
    popular: 'Pages les plus consultées',
    independenceTitle: 'Service privé, indépendant du gouvernement du Canada',
    rights: 'Tous droits réservés.',
    emailLabel: 'Adresse e-mail',
  },

  breadcrumb: {
    home: 'Accueil',
    aria: "Fil d'Ariane",
  },

  trust: [
    { value: '5 min', label: 'pour remplir votre demande' },
    { value: 'En ligne', label: 'sur téléphone, tablette ou ordinateur' },
    { value: 'Vérifié', label: "avant l'envoi de la demande" },
    { value: '{count}', label: 'guides disponibles par nationalité' },
  ],

  steps: [
    {
      title: 'Remplissez le formulaire',
      description:
        'Saisissez vos informations exactement comme elles figurent sur votre passeport : identité, naissance, adresse et passeport.',
    },
    {
      title: 'Nous vérifions la demande',
      description:
        "Un conseiller contrôle chaque champ, en particulier le numéro de passeport, source d'erreur la plus fréquente, et vous contacte si une correction est nécessaire.",
    },
    {
      title: 'La demande est envoyée',
      description:
        "Une fois vérifiée, la demande est soumise auprès d'Immigration, Réfugiés et Citoyenneté Canada (IRCC), qui prend seul la décision.",
    },
    {
      title: 'Vous recevez la réponse',
      description:
        "La plupart des demandes d'AVE sont approuvées en quelques minutes. Certaines demandent des documents supplémentaires : nous vous prévenons par e-mail.",
    },
  ],

  requirements: [
    {
      title: "Un passeport d'un pays dispensé de visa",
      description:
        "L'AVE est liée électroniquement à ce passeport. Il doit être en cours de validité et c'est lui que vous présenterez à l'embarquement.",
      mandatory: true,
    },
    {
      title: 'Une adresse e-mail valide',
      description:
        "La réponse et toute demande de document supplémentaire arrivent par e-mail. Vérifiez l'orthographe et surveillez vos courriers indésirables.",
      mandatory: true,
    },
    {
      title: 'Vos informations personnelles',
      description:
        'Nom, prénoms, date et lieu de naissance, nationalité, adresse et téléphone, tels qu’ils figurent sur vos documents.',
      mandatory: true,
    },
    {
      title: 'Une carte de paiement',
      description:
        'Le paiement se fait en ligne par carte bancaire, en toute sécurité.',
      mandatory: true,
    },
    {
      title: 'Des documents supplémentaires',
      description:
        "Dans certains cas, IRCC demande des pièces complémentaires. Les instructions sont alors envoyées par e-mail, généralement sous 72 heures.",
      mandatory: false,
    },
    {
      title: 'Un passeport canadien si vous êtes aussi Canadien',
      description:
        "Les doubles nationaux canadiens ne peuvent pas utiliser d'AVE : ils doivent voyager avec un passeport canadien valide.",
      mandatory: false,
    },
  ],

  optionalTag: 'selon le cas',

  faqs: [
    {
      question: "Qu'est-ce que l'AVE Canada (eTA) ?",
      answer:
        "L'autorisation de voyage électronique (AVE, ou eTA en anglais) est une formalité d'entrée pour les citoyens des pays dispensés de visa qui se rendent au Canada ou y font escale en avion. Elle est liée électroniquement à votre passeport.",
    },
    {
      question: 'Le Canada exige-t-il un visa ou un « eVisa » ?',
      answer:
        "Pas pour les citoyens des pays dispensés de visa, comme la France, la Belgique ou la Suisse : ils ont seulement besoin d'une AVE pour un voyage en avion. Les ressortissants des autres pays ont en général besoin d'un visa de visiteur, qui est une démarche différente.",
    },
    {
      question: "Combien de temps faut-il pour obtenir l'AVE ?",
      answer:
        "La plupart des demandes sont approuvées en quelques minutes. Certaines nécessitent des documents supplémentaires ; les instructions sont alors envoyées par e-mail, généralement sous 72 heures. Faites votre demande dès que votre voyage est prévu, avant de réserver vos billets si possible.",
    },
    {
      question: "Combien de temps l'AVE est-elle valable ?",
      answer:
        "Elle est en général valable jusqu'à cinq ans, ou jusqu'à l'expiration du passeport si elle intervient avant, pour un nombre illimité de séjours. La durée de chaque séjour est fixée par l'agent des services frontaliers à l'arrivée.",
    },
    {
      question: 'Faut-il une AVE pour les enfants ?',
      answer:
        "Oui. Chaque voyageur doit avoir sa propre AVE, y compris les enfants et les nourrissons, avec leur propre passeport.",
    },
    {
      question: "Faut-il une AVE pour entrer au Canada par la route ou par la mer ?",
      answer:
        "Non, dans la plupart des cas : l'AVE est exigée pour un voyage en avion. Arriver par la route, le train ou le bateau depuis les États-Unis ne la nécessite généralement pas, mais le passeport reste obligatoire.",
    },
    {
      question: 'Les citoyens américains ont-ils besoin d’une AVE ?',
      answer:
        "Non. Les citoyens des États-Unis en sont dispensés. Les résidents permanents des États-Unis le sont aussi depuis le 26 avril 2022, à condition de présenter leur passeport et leur carte verte valide.",
    },
  ],

  templates: {
    A: {
      label: 'Vols directs vers le Canada',
      summary:
        "Les voyageurs partant de {country} trouvent des vols directs vers les grandes villes canadiennes. En tant que ressortissants d'un pays dispensé de visa, ils ont besoin d'une AVE pour embarquer.",
      focus: [
        {
          title: "Demandez l'AVE avant de réserver",
          body: "La plupart des réponses arrivent en quelques minutes, mais certaines demandent des documents supplémentaires. Anticipez pour ne pas risquer un refus d'embarquement.",
        },
        {
          title: 'Le bon passeport, le bon numéro',
          body: "L'AVE est liée au passeport saisi dans la demande. Voyagez avec ce même passeport et vérifiez chaque caractère du numéro, sans confondre la lettre O et le chiffre 0.",
        },
      ],
    },
    B: {
      label: 'Itinéraire avec correspondance',
      summary:
        "Depuis {country}, la plupart des itinéraires vers le Canada passent par une grande plateforme européenne. L'AVE est exigée dès l'embarquement sur le vol à destination du Canada.",
      focus: [
        {
          title: "Une seule AVE, quel que soit l'itinéraire",
          body: "L'escale ne change rien à la démarche : une AVE valide suffit pour embarquer vers le Canada, que le vol soit direct ou non.",
        },
        {
          title: 'Contrôlez les règles du pays d’escale',
          body: "Selon la ville de correspondance, d'autres formalités peuvent s'appliquer. Vérifiez-les auprès de votre compagnie avant de réserver.",
        },
      ],
    },
    C: {
      label: 'Long-courrier, parfois via les États-Unis',
      summary:
        "Depuis {country}, le voyage vers le Canada est un long-courrier. Certains itinéraires font escale aux États-Unis, ce qui ajoute une formalité américaine à l'AVE canadienne.",
      focus: [
        {
          title: 'Escale aux États-Unis : une formalité en plus',
          body: "Une correspondance sur le sol américain exige une autorisation américaine (ESTA ou visa selon la nationalité), en plus de l'AVE. Un vol direct l'évite.",
        },
        {
          title: 'Gérez le décalage horaire',
          body: "Les dates saisies dans vos réservations suivent l'heure locale : un départ le soir peut arriver au Canada le même jour, voire la veille.",
        },
      ],
    },
  },

  cta: {
    title: 'Vous avez votre passeport sous la main ?',
    description:
      "Vous pouvez commencer. Le formulaire prend environ cinq minutes, puis un conseiller vérifie les informations avant l'envoi.",
  },

  home: {
    heroBadge: 'Formulaire en ligne avec vérification de la demande',
    heroTitle: 'AVE Canada : votre autorisation de voyage électronique en ligne',
    heroText:
      "Les citoyens des pays dispensés de visa n'ont pas besoin de visa pour le Canada, mais doivent obtenir une AVE (eTA) avant de prendre l'avion. Remplissez votre demande en ligne : nous vérifions chaque information avant l'envoi.",
    heroBullets: [
      'Formulaire guidé en français',
      "Vérification humaine avant l'envoi",
      'Suivi et confirmations par e-mail',
    ],
    stepsEyebrow: 'La démarche',
    stepsTitle: 'Une démarche claire, du formulaire à la réponse',
    stepsText:
      'Vous renseignez vos informations et votre passeport. Nous vérifions la demande avant son envoi à IRCC.',
    requirementsEyebrow: 'Conditions requises',
    requirementsTitle: 'AVE Canada : ce qu’il faut préparer',
    requirementsText:
      "Pas de billet ni de réservation à fournir : votre passeport, une adresse e-mail et quelques informations personnelles suffisent.",
    nationalitiesEyebrow: 'Par nationalité',
    nationalitiesTitle: "Les règles de l'AVE Canada selon votre nationalité",
    nationalitiesText:
      'Consultez les formalités, les vols vers le Canada et les points à vérifier avant votre départ.',
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'AVE Canada : les réponses aux questions fréquentes',
  },

  applyPage: {
    title: "Votre demande d'AVE pour le Canada",
    metaTitle: "Faire une demande d'AVE Canada (eTA)",
    metaDescription:
      "Remplissez votre demande d'autorisation de voyage électronique pour le Canada en quelques étapes guidées. Demande vérifiée avant envoi.",
    intro:
      "Quelques étapes guidées. Votre saisie reste temporairement dans cet onglet jusqu'au paiement sécurisé.",
    introLink: "Vérifiez d'abord les conditions requises",
  },

  requirementsPage: {
    metaTitle: "Conditions requises pour l'AVE Canada",
    metaDescription:
      "Passeport d'un pays dispensé de visa, e-mail, informations personnelles : tout ce qu'il faut pour demander l'AVE Canada (eTA).",
    title: "Les conditions pour obtenir l'AVE Canada",
    intro:
      "L'AVE est exigée des citoyens des pays dispensés de visa qui se rendent au Canada ou y font escale en avion. Elle est contrôlée à l'embarquement, puis l'agent des services frontaliers décide de l'entrée à l'arrivée.",
    listEyebrow: 'À préparer',
    listTitle: "Ce qu'il faut pour une demande complète",
    mistakesEyebrow: 'Erreurs fréquentes',
    mistakesTitle: 'Quatre erreurs courantes à éviter',
    mistakes: [
      {
        title: 'Un numéro de passeport mal saisi',
        body: "C'est l'erreur la plus fréquente. Une AVE liée à un mauvais numéro ne vous permettra pas d'embarquer : vérifiez chaque caractère, en distinguant la lettre O du chiffre 0.",
      },
      {
        title: 'Le mauvais passeport',
        body: "Si vous avez plusieurs nationalités, utilisez le passeport avec lequel vous voyagerez. Les doubles nationaux canadiens doivent voyager avec un passeport canadien.",
      },
      {
        title: 'Un passeport renouvelé après la demande',
        body: "L'AVE est liée à un passeport précis. Si vous en changez, il faut demander une nouvelle AVE avant votre voyage.",
      },
      {
        title: 'Une adresse e-mail erronée',
        body: "La réponse et les éventuelles demandes de documents arrivent par e-mail. Une lettre manquante, et vous ne recevez rien.",
      },
    ],
    nextEyebrow: 'Après la demande',
    nextTitle: 'Ce qui se passe ensuite',
  },

  nationalitiesPage: {
    metaTitle: 'AVE Canada par nationalité',
    metaDescription:
      "Les règles de l'AVE Canada (eTA) selon votre nationalité : conditions, vols vers le Canada, escales et points de vigilance.",
    title: 'Les formalités selon votre nationalité',
    intro:
      "L'AVE est exigée des citoyens des pays dispensés de visa, mais les vols, les escales et les points de vigilance changent d'un pays à l'autre. {count} guides détaillés sont disponibles.",
    countryCount: '{count} pays',
    ctaTitle: "Votre pays n'apparaît pas dans la liste ?",
    ctaText:
      "Écrivez-nous : nous vérifions si votre nationalité relève de l'AVE ou d'un visa de visiteur avant toute démarche.",
    cardText: "AVE Canada : conditions et démarches pour les {demonym}.",
  },

  nationalityPage: {
    metaTitle: 'AVE Canada pour les {demonym}',
    metaDescription:
      "AVE Canada (eTA) pour les voyageurs de nationalité {adjective} : conditions, passeport, vols vers le Canada et points de vigilance.",
    title: 'AVE Canada : les règles pour les {demonym}',
    facts: {
      nationality: 'Nationalité',
      authorisation: 'AVE (eTA)',
      required: 'Obligatoire pour un voyage en avion',
      officialFee: 'Redevance officielle IRCC',
      flightDuration: 'Temps de vol vers le Canada',
      timezone: 'Décalage horaire',
      currency: 'Monnaie au départ',
    },
    beforeEyebrow: 'Depuis {country}',
    beforeTitle: "Ce qu'il faut vérifier avant le départ",
    flightsTitle: 'Vos vols vers le Canada',
    routeText:
      "Les horaires et itinéraires depuis {country} peuvent changer. Vérifiez le trajet complet auprès de la compagnie, y compris les formalités de chaque pays d'escale.",
    airportsTitle: 'Aéroports de départ',
    carriersTitle: 'Compagnies desservant le Canada',
    highSeasonStrong: 'Haute saison :',
    highSeasonText:
      '{season}. Réservez tôt pendant ces périodes très demandées.',
    passportTitle: 'Votre passeport',
    healthTitle: 'Santé',
    healthRequired:
      "Vérifiez les recommandations sanitaires applicables aux voyageurs arrivant depuis {country} avant le départ.",
    healthNotRequired:
      "Aucun certificat de vaccination n'est exigé pour entrer au Canada depuis {country}. Une assurance voyage reste vivement recommandée : les soins y sont coûteux pour les visiteurs.",
    watchTitle: 'Point de vigilance',
    docsEyebrow: 'À préparer',
    docsTitle: "La demande d'un voyageur de nationalité {adjective}",
    stepsEyebrow: 'Déroulé',
    stepsTitle: 'Comment se passe la demande',
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'Les {demonym} nous demandent souvent',
    faqMore: 'Toutes les questions',
    /** FAQ propre à chaque pays, construite à partir de `data/nationalities.json`. */
    countryFaq: {
      authorisationQ: "Les {demonym} ont-ils besoin d'une AVE pour le Canada ?",
      authorisationA:
        "Oui, pour un voyage en avion. Les voyageurs de nationalité {adjective} sont dispensés de visa, mais doivent obtenir une AVE avant d'embarquer vers le Canada ou d'y faire escale. Par la route ou par la mer, elle n'est en général pas exigée.",
      flightQ: 'Combien de temps dure le vol depuis {country} ?',
      flightA: '{flightDuration}. {flightInfo}',
      carriersQ: 'Quelles compagnies relient {country} au Canada ?',
      carriersA:
        "Au départ de {airports}, les vols vers le Canada sont notamment assurés par {carriers}. Les itinéraires évoluent : vérifiez le trajet complet auprès de la compagnie.",
      healthQ: 'Faut-il un vaccin pour entrer au Canada depuis {country} ?',
      transitQ: 'Quel point surveiller pendant la correspondance ?',
      timezoneQ: 'Quel est le décalage horaire entre {country} et le Canada ?',
      timezoneA: '{timezone}. Le Canada compte six fuseaux horaires : vérifiez celui de votre ville d’arrivée.',
      seasonQ: 'Quand est-il le plus difficile de trouver des places depuis {country} ?',
      seasonA:
        "Période la plus demandée pour les départs depuis {country} : {season}. Demandez l'AVE dès que le voyage est décidé, avant même de réserver.",
      passportQ: 'Quel passeport faut-il pour demander l’AVE ?',
      usTripQ: 'Peut-on combiner le Canada et les États-Unis depuis {country} ?',
      plugsQ: 'Faut-il un adaptateur électrique pour le Canada ?',
      languageQ: 'Quelle langue parle-t-on au Canada ?',
      tripQ: 'Que visiter au Canada quand on part de {country} ?',
    },
    goodToKnowEyebrow: 'Bon à savoir',
    goodToKnowTitle: 'Voyager au Canada depuis {country}',
    languageTitle: 'Langue',
    plugsTitle: 'Électricité',
    usTripTitle: 'Combiner avec les États-Unis',
    specialTitle: 'Cas particulier',
    tripIdeaTitle: 'Idée de voyage depuis {country}',
    guidesEyebrow: 'Aller plus loin',
    guidesTitle: 'Nos guides pour préparer le voyage',
    relatedEyebrow: 'Autres nationalités',
    relatedTitle: 'Poursuivre la lecture',
    ctaTitle: 'Prêt à demander votre AVE depuis {country} ?',
    ctaText:
      "Un conseiller vérifie chaque champ avant l'envoi. Vous êtes prévenu dès qu'une information doit être corrigée.",
  },

  faqPage: {
    metaTitle: 'Questions fréquentes sur l’AVE Canada',
    metaDescription:
      "Délais, validité, enfants, voyage par la route, citoyens américains : les réponses aux questions les plus posées sur l'AVE Canada (eTA).",
    title: 'Questions fréquentes',
    intro: 'Vous ne trouvez pas votre réponse ?',
    introLink: 'Écrivez-nous',
    introEnd: ', un conseiller vous répond par e-mail.',
  },

  guidesPage: {
    metaTitle: 'Guides de voyage au Canada',
    metaDescription:
      "Saisons, demande d'AVE et choix des villes : nos guides pour préparer un voyage au Canada sans mauvaise surprise.",
    title: 'Guides de voyage',
    intro:
      'Des articles pratiques écrits pour les voyageurs, mis à jour au fil des évolutions des formalités.',
    reading: 'Lecture {time}',
    breadcrumbArticle: 'Article',
    relatedTitle: 'À lire également',
  },

  contactPage: {
    metaTitle: 'Nous contacter',
    metaDescription:
      "Une question sur votre AVE pour le Canada ? Envoyez un message sécurisé à notre équipe.",
    title: 'Nous contacter',
    intro:
      'Nous répondons par e-mail dès que possible. Pour une question sur un dossier en cours, indiquez la référence reçue après le paiement.',
    emailTitle: 'Par e-mail',
    emailReply: 'Nous répondons dès que possible.',
    addressTitle: 'Adresse postale',
    urgentTitle: 'Départ imminent',
    urgentText:
      "Vous partez dans moins de 72 heures ? Indiquez « Urgent » et votre date de départ. Cela ne raccourcit pas le délai de traitement d'IRCC.",
  },

  contactForm: {
    title: 'Écrire à un conseiller',
    name: 'Nom complet',
    email: 'Adresse e-mail',
    subject: 'Objet',
    reference: 'Référence du dossier',
    optional: '(facultatif)',
    message: 'Votre message',
    subjects: {
      question: 'Question avant de faire une demande',
      file: "Suivi d'un dossier en cours",
      refusal: 'Demande refusée',
      billing: 'Facturation',
      other: 'Autre sujet',
    },
    warning:
      "N'indiquez ni numéro de carte bancaire ni mot de passe dans ce message. Pour transmettre un document, attendez notre réponse par e-mail.",
    submit: 'Envoyer le message',
    errors: {
      name: 'Indiquez votre nom.',
      email: 'Saisissez une adresse e-mail valide.',
      message: 'Décrivez votre demande en quelques phrases (20 caractères minimum).',
    },
    sentTitle: 'Message reçu',
    sentText:
      "Votre message a été enregistré de manière sécurisée. Notre équipe répondra à l'adresse e-mail indiquée.",
    sentBack: 'Revenir au formulaire',
  },

  trackingPage: {
    metaTitle: 'Suivre mon dossier',
    metaDescription:
      "Consultez l'état d'avancement de votre demande d'AVE pour le Canada à partir de votre référence de dossier.",
    title: 'Suivre mon dossier',
    intro:
      "Saisissez la référence affichée après le paiement et l'adresse e-mail utilisée pour la demande. Sans référence sous la main,",
    introLink: 'contactez un conseiller',
    statesTitle: "Les quatre états d'un dossier",
    states: [
      { label: 'Dossier reçu', body: 'Votre demande et votre paiement nous sont parvenus.' },
      { label: 'En vérification', body: 'Un conseiller contrôle chaque champ de la demande.' },
      { label: 'Envoyée à IRCC', body: 'La demande est soumise aux autorités canadiennes.' },
      { label: 'Décision reçue', body: 'La réponse vous est transmise par e-mail.' },
    ],
  },

  trackingForm: {
    title: 'Retrouver ma demande',
    reference: 'Référence du dossier',
    email: 'Adresse e-mail du dossier',
    submit: "Afficher l'état de ma demande",
    error: "Saisissez la référence APP reçue après le paiement et l'adresse e-mail utilisée pour la demande.",
    resultTitle: 'État de la demande',
    resultText: 'Le statut affiché provient de votre dossier enregistré.',
  },

  notFound: {
    metaTitle: 'Page introuvable',
    eyebrow: 'Erreur 404',
    title: "Cette page n'existe pas",
    text:
      "Le lien est peut-être obsolète. Reprenez depuis l'accueil ou choisissez directement la page correspondant à votre nationalité.",
  },

  legal: {
    updatedLabel: 'Dernière mise à jour :',
    updatedAt: '23 septembre 2026',
    notice: {
      metaTitle: 'Mentions légales',
      metaDescription: 'Mentions légales de canada-evisa.com : éditeur, siège social, nature de ce service privé d’assistance à l’AVE et propriété intellectuelle.',
      title: 'Mentions légales',
      blocks: [
        { kind: 'heading', text: 'Nature du service' },
        { kind: 'paragraph', text: '{disclaimer}' },
        {
          kind: 'paragraph',
          text: "Vous pouvez faire votre demande d'AVE vous-même sur canada.ca, le seul site officiel du gouvernement du Canada, pour 7 CAD.",
        },
        {
          kind: 'paragraph',
          text: "Le service consiste en une assistance payante à la préparation et à la vérification de la demande d'AVE. La décision d'accorder ou de refuser l'AVE, puis l'entrée au Canada, appartient exclusivement aux autorités canadiennes.",
        },
        { kind: 'heading', text: 'Éditeur du site' },
        {
          kind: 'list',
          items: [
            'Dénomination sociale : {legalName}',
            'Forme juridique : Limited Liability Company (LLC)',
            'Siège social : {address}',
          ],
        },
        { kind: 'contact' },
        { kind: 'heading', text: 'Propriété intellectuelle' },
        {
          kind: 'paragraph',
          text: "L'ensemble des contenus de ce site, hors mentions contraires, est protégé par le droit d'auteur. Toute reproduction sans autorisation écrite préalable est interdite.",
        },
        { kind: 'heading', text: 'Liens externes' },
        {
          kind: 'paragraph',
          text: "Le lien vers le site officiel canada.ca est fourni à titre informatif. Nous n'exerçons aucun contrôle sur son contenu.",
        },
      ] as LegalBlock[],
    },
    privacy: {
      metaTitle: 'Politique de confidentialité',
      metaDescription:
        'Quelles données sont collectées, pourquoi, combien de temps elles sont conservées et comment exercer vos droits.',
      title: 'Politique de confidentialité',
      blocks: [
        { kind: 'heading', text: 'Responsable du traitement' },
        { kind: 'paragraph', text: '{legalName}, {address}.' },
        { kind: 'contact' },
        { kind: 'heading', text: 'Données collectées' },
        {
          kind: 'list',
          items: [
            'Identité : nom, prénoms, sexe, date et lieu de naissance, nationalité.',
            "Passeport : numéro, pays de délivrance, dates de délivrance et d'expiration.",
            'Coordonnées : adresse, adresse e-mail, numéro de téléphone.',
            'Facturation : montant et historique des paiements.',
          ],
        },
        { kind: 'heading', text: 'Finalités et bases légales' },
        {
          kind: 'paragraph',
          text: "Les données d'identité et de passeport sont traitées pour exécuter le contrat d'assistance que vous concluez avec nous et soumettre votre demande aux autorités canadiennes. Les données de facturation répondent à une obligation légale de conservation comptable.",
        },
        { kind: 'heading', text: 'Brouillon enregistré dans votre navigateur' },
        {
          kind: 'paragraph',
          text: "Le formulaire conserve temporairement les champs saisis dans le stockage de session de l'onglet. Le brouillon est effacé après confirmation du paiement ou à la fermeture de l'onglet.",
        },
        { kind: 'heading', text: 'Destinataires' },
        {
          kind: 'paragraph',
          text: "Vos données sont transmises à Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour le traitement de votre AVE, ainsi qu'à nos prestataires techniques (hébergement, messagerie, paiement, chat en ligne), tenus par des engagements de confidentialité.",
        },
        { kind: 'heading', text: 'Durée de conservation' },
        {
          kind: 'paragraph',
          text: "Les données de la demande sont conservées uniquement le temps nécessaire à la réalisation du service, au suivi de la demande et au respect des obligations légales. Les données de paiement et pièces comptables sont conservées pendant la durée légale applicable.",
        },
        { kind: 'heading', text: 'Vos droits' },
        {
          kind: 'paragraph',
          text: "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité. Vous pouvez également saisir l'autorité de protection des données compétente.",
        },
        { kind: 'heading', text: 'Cookies' },
        {
          kind: 'paragraph',
          text: "Ce site ne dépose aucun cookie publicitaire. Seuls des cookies nécessaires au fonctionnement, dont ceux du chat en ligne, peuvent être utilisés.",
        },
      ] as LegalBlock[],
    },
    terms: {
      metaTitle: 'Conditions générales de service',
      metaDescription:
        'Objet du service, prix, délais, obligations du client, droit de rétractation et responsabilité.',
      title: 'Conditions générales de service',
      blocks: [
        { kind: 'heading', text: '1. Objet' },
        {
          kind: 'paragraph',
          text: "{legalName} propose un service payant d'assistance à la préparation, à la vérification et à la soumission des demandes d'autorisation de voyage électronique (AVE) pour le Canada. {disclaimer}",
        },
        { kind: 'heading', text: '2. Prix' },
        {
          kind: 'paragraph',
          text: 'Les prix comprennent la redevance officielle reversée au gouvernement du Canada et nos frais de service, par voyageur :',
        },
        { kind: 'plans' },
        { kind: 'heading', text: '3. Obligations du client' },
        {
          kind: 'paragraph',
          text: "Vous garantissez l'exactitude des informations transmises, en particulier celles de votre passeport. Une information erronée peut entraîner un refus ou un refus d'embarquement dont nous ne saurions être tenus responsables.",
        },
        { kind: 'heading', text: '4. Délais' },
        {
          kind: 'paragraph',
          text: "La vérification commence après le paiement. Le délai de décision dépend d'IRCC : la plupart des demandes sont traitées en quelques minutes, d'autres nécessitent des documents supplémentaires. Aucun délai de délivrance n'est garanti.",
        },
        { kind: 'heading', text: '5. Droit de rétractation' },
        {
          kind: 'paragraph',
          text: "Le service commence après le paiement afin que la demande puisse être vérifiée sans délai. Les droits impératifs d'annulation ou de rétractation prévus par la loi applicable au client restent inchangés.",
        },
        { kind: 'heading', text: '6. Refus' },
        {
          kind: 'paragraph',
          text: "En cas de refus, nous vous communiquons les informations reçues et les démarches possibles. La redevance officielle n'est pas remboursable.",
        },
        { kind: 'heading', text: '7. Responsabilité' },
        {
          kind: 'paragraph',
          text: "Notre responsabilité est limitée aux frais de service encaissés. Nous ne pouvons être tenus responsables d'un refus d'embarquement, d'une décision des autorités canadiennes, ni des conséquences d'un voyage annulé.",
        },
        { kind: 'heading', text: '8. Droit applicable et litiges' },
        {
          kind: 'paragraph',
          text: "Les présentes conditions sont régies par les règles applicables à {legalName}, sans priver le consommateur des protections impératives de son pays de résidence. Toute réclamation peut d'abord être adressée au service client afin d'être examinée.",
        },
        { kind: 'contact' },
      ] as LegalBlock[],
    },
  },
}

export type Dictionary = typeof fr
