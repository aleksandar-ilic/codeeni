import type { Dictionary } from "./en";

export const sr: Dictionary = {
  meta: {
    title: "Codeeni — Gde logika susreće besprekorno izvršenje",
    description:
      "Codeeni pravi web aplikacije po meri, skalabilnu arhitekturu i gotove softverske šablone koji vaše poslovanje vode napred.",
    ogDescription: "Elegantna softverska rešenja za složene probleme.",
    startTitle: "Započnite projekat — Codeeni",
    startDescription: "Recite nam nešto o svom poslovanju i šta vam treba. Četiri kratka koraka, bez obaveze.",
  },
  site: {
    tagline: "Gde logika susreće besprekorno izvršenje",
    responseTime: "U roku od jednog radnog dana",
  },
  nav: {
    links: { services: "Usluge", solutions: "Rešenja", process: "Proces", contact: "Kontakt" },
    startProject: "Započnite projekat",
    home: "Codeeni početna",
    primary: "Glavna navigacija",
    footer: "Navigacija u podnožju",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
  },
  controls: {
    theme: "Promeni svetlu ili tamnu temu",
    language: "Jezik",
  },
  hero: {
    badge: "Gde logika susreće besprekorno izvršenje.",
    titleStart: "Elegantna softverska rešenja za ",
    titleHighlight: "složene probleme.",
    subtitle:
      "Pravimo web aplikacije po meri, skalabilnu arhitekturu i gotove softverske šablone koji vaše poslovanje vode napred.",
    primaryCta: "Započnimo saradnju",
    secondaryCta: "Pogledajte naša rešenja",
    guarantee: {
      aria: "Naša garancija",
      label: "Garancija",
      before: "",
      highlight: "Fiksna cena",
      after: ", dogovorena pre nego što napišemo prvu liniju koda. Bez iznenađenja na računu.",
    },
    visual: {
      codeAria: "Primer koda koji ilustruje Codeeni projekat",
      uptime: "Dostupnost",
      deploy: "Isporuka",
      tests: "Testovi",
    },
  },
  services: {
    eyebrow: "Usluge",
    titleStart: "Inženjering koji pokreće ",
    titleHighlight: "vaše poslovanje",
    description:
      "Bilo da krećete od nule ili raspetljavate zastareo sistem, u svaki projekat unosimo iskustvo seniorskih inženjera.",
    items: [
      {
        title: "Razvoj web aplikacija po meri",
        summary: "Full-stack aplikacije napravljene da rastu, od prvog commita do miliona zahteva.",
        highlights: ["React i Next.js frontend", "Tipski bezbedni API-ji i servisi", "Brzina kao standard"],
      },
      {
        title: "Softverski šabloni",
        summary: "Gotove arhitektonske osnove koje ubrzavaju vaše lansiranje za nekoliko nedelja.",
        highlights: ["Prijava, naplata i kontrolne table", "Uključeni CI/CD procesi", "Dokumentovano i proširivo"],
      },
      {
        title: "Rešavanje tehničkih problema",
        summary: "Precizno rešavamo uska grla u backendu, bazama podataka i infrastrukturi.",
        highlights: ["Optimizacija upita i šema", "Skaliranje i smanjenje troškova", "Revizija arhitekture"],
      },
    ],
  },
  benefits: {
    eyebrow: "Zašto je to važno",
    titleStart: "Šta dobar softver ",
    titleHighlight: "zaista radi za vas",
    groups: [
      {
        title: "Povećava vaše prihode",
        items: [
          {
            title: "Pronalaze vas na Google-u i u AI pretrazi",
            body: [
              "Brzi i dobro strukturirani sajtovi bolje se rangiraju i postaju ",
              { em: "izvori koje ChatGPT i Perplexity navode" },
              " kada neko traži preporuku.",
            ],
          },
          {
            title: "Brzina koja prodaje",
            body: [
              "Svaka dodatna sekunda učitavanja košta prodaje. Pravimo stranice koje se učitavaju za manje od sekunde, pa ",
              { em: "više posetilaca postaje kupaca" },
              ".",
            ],
          },
          {
            title: "Lansirajte nedeljama ranije",
            body: [
              "Naši šabloni vam od prvog dana daju prijavu, naplatu i kontrolne table, pa ",
              { em: "ranije počinjete da prodajete" },
              ".",
            ],
          },
          {
            title: "Raste bez ponovnog pisanja",
            body: [
              "Arhitektura planirana za rast znači da vaš proizvod podnosi ",
              { em: "10× više korisnika bez kretanja ispočetka" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Štedi vreme i novac",
        items: [
          {
            title: "Automatizujte rutinske poslove",
            body: [
              "Fakture, izveštaji, mejlovi za nove klijente, unos podataka: ako vaš tim to stalno ponavlja, ",
              { em: "softver to može da radi umesto njega" },
              ".",
            ],
          },
          {
            title: "Jedna kontrolna tabla umesto deset tabela",
            body: ["Podaci uživo na jednom mestu, pa odluke traju ", { em: "minute umesto sastanaka" }, "."],
          },
          {
            title: "Niži troškovi infrastrukture",
            body: [
              "Cloud okruženje prave veličine i efikasni upiti znače da ",
              { em: "prestajete da plaćate kapacitet koji ne koristite" },
              ".",
            ],
          },
          {
            title: "Manje hitnih intervencija u 3 ujutru",
            body: [
              "Automatski testovi, monitoring i uredne isporuke omogućavaju vašem timu da ",
              { em: "pravi nove funkcije umesto da gasi požare" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  solutions: {
    eyebrow: "Rešenja",
    titleStart: "Napravljeno, isporučeno i ",
    titleHighlight: "radi u produkciji",
    description: "Izbor aplikacija po meri, gotovih šablona i tehničkih spasavanja koje smo isporučili.",
    filterLabel: "Filtriraj projekte",
    all: "Sve",
    categories: { webApps: "Web aplikacije", templates: "Šabloni", problemSolving: "Rešavanje problema" },
    viewLive: "Pogledaj uživo",
    buildSimilar: "Napravi slično",
    techStack: "Tehnologije",
    projects: {
      fleetpulse: {
        title: "FleetPulse",
        client: "Logistička kompanija",
        summary: "Kontrolna tabla za praćenje vozila i dispečing u realnom vremenu, umesto gomile tabela.",
        metric: { value: "40%", label: "brži dispečing" },
      },
      launchkit: {
        title: "LaunchKit SaaS Starter",
        client: "Codeeni šablon",
        summary: "SaaS osnova spremna za produkciju sa prijavom, timskim nalozima, Stripe naplatom i admin panelom.",
        metric: { value: "3 ned.", label: "uštede po lansiranju" },
      },
      shopflow: {
        title: "ShopFlow Commerce",
        client: "Maloprodajni brend",
        summary: "Headless prodavnica sa munjevito brzom pretragom proizvoda i jednostavnom naplatom na jednoj stranici.",
        metric: { value: "2,1×", label: "veća konverzija" },
      },
      ledgerTuning: {
        title: "Ubrzanje finansijskih izveštaja",
        client: "Fintech platforma",
        summary: "Spasili smo usporenu knjigu transakcija redizajnom indeksa i restrukturiranjem upita.",
        metric: { value: "15×", label: "brži izveštaji" },
      },
      storefrontKit: {
        title: "Storefront Kit",
        client: "Codeeni šablon",
        summary: "Osnova za online prodavnicu sa katalogom, korpom, plaćanjem i CMS stranicama, spremna za vaš brend.",
        metric: { value: "< 1 s", label: "učitavanje stranica" },
      },
      cloudMigration: {
        title: "Smanjenje cloud troškova",
        client: "B2B SaaS kompanija",
        summary: "Kontejnerizovali smo zastareli monolit i prilagodili infrastrukturu bez ijednog prekida rada.",
        metric: { value: "−38%", label: "mesečni cloud račun" },
      },
    },
  },
  process: {
    eyebrow: "Kako radimo",
    titleStart: "Proces ",
    titleHighlight: "besprekornog izvršenja",
    titleEnd: "",
    description: "Jasan put u tri faze od ideje do produkcije, bez iznenađenja usput.",
    stepLabel: "Faza",
    steps: [
      {
        title: "Arhitektura i strategija",
        description:
          "Vaše ciljeve pretvaramo u tehnički plan: prave tehnologije, model podataka i infrastrukturu, pre nego što ijedna linija koda ode u produkciju.",
        deliverables: ["Tehnička mapa puta", "Dizajn sistema"],
      },
      {
        title: "Precizan razvoj",
        description:
          "Iterativni razvoj vođen testovima, uz nedeljne demonstracije, pa vidite stvarni napredak i sigurno usmeravate projekat.",
        deliverables: ["Nedeljne demonstracije", "Automatski testovi"],
      },
      {
        title: "Besprekorna isporuka",
        description: "Puštanje u rad bez prekida, monitoring i uredna primopredaja. Vaš proizvod ide uživo i ostaje brz.",
        deliverables: ["CI/CD i monitoring", "Dokumentacija i primopredaja"],
      },
    ],
  },
  pricing: {
    eyebrow: "Cene",
    titleStart: "Koliko ",
    titleHighlight: "košta?",
    description:
      "Svaki projekat prilagođavamo vašim potrebama, pa ne postoji jedinstven cenovnik. Obećavamo iskrenost: cenu koja odgovara fazi u kojoj ste, a ne budžetima velikih korporacija.",
    principles: [
      {
        title: "Fer i transparentne cene",
        description:
          "Fiksne ponude za jasno definisan obim posla i jasne cene za dugoročnu saradnju. Uvek znate za šta plaćate.",
      },
      {
        title: "Bez skrivenih troškova",
        description: "Rezultati, rokovi i budžet dogovaraju se unapred, pre nego što posao počne.",
      },
      {
        title: "Bez obaveze",
        description: "Prvi razgovor i procena su besplatni. Odlučujete tek kada vidite našu ponudu.",
      },
    ],
    quote: {
      eyebrow: "Vaša ponuda",
      titleStart: "Recite nam šta vam treba i dobijte ",
      titleHighlight: "tačnu cenu.",
      body: "Kratak razgovor je dovoljan da razumemo vaše ciljeve i pošaljemo konkretnu ponudu. Bez ikakvih obaveza.",
      cta: "Zatražite ponudu",
      reply: "Odgovor u roku od jednog radnog dana",
    },
  },
  contact: {
    eyebrow: "Kontakt",
    titleStart: "Gradimo ",
    titleHighlight: "zajedno",
    description:
      "Recite nam nešto o svom projektu. Odgovorićemo jasnim sledećim koracima, iskrenom procenom i bez prodajnih priča.",
    emailLabel: "Pišite nam",
    responseLabel: "Vreme odgovora",
    form: {
      name: { label: "Ime", placeholder: "Marko Marković" },
      email: { label: "Email", placeholder: "marko@firma.rs" },
      details: {
        label: "Detalji projekta",
        placeholder: "Opišite svoje ciljeve, rokove i tehničke izazove…",
      },
      submit: "Pošaljite poruku",
      sending: "Šaljemo…",
      success: "Hvala, {name}! Javićemo vam se uskoro.",
      fixFields: "Ispravite označena polja.",
      errors: {
        nameRequired: "Unesite svoje ime.",
        emailInvalid: "Unesite ispravnu email adresu.",
        detailsTooShort: "Napišite nešto više o projektu (najmanje {min} karaktera).",
      },
    },
  },
  footer: {
    rights: "Sva prava zadržana.",
    builtWith: "Napravljeno s logikom i pažnjom.",
  },
  brief: {
    eyebrow: "Upitnik za projekat",
    titleStart: "Započnite svoj ",
    titleHighlight: "projekat",
    intro: "Četiri kratka koraka, oko dva minuta.",
    assurances: [
      "Odgovor u roku od jednog radnog dana",
      "Fiksna cena, dogovorena unapred",
      "Besplatna procena, bez obaveze",
    ],
    steps: [
      {
        label: "O vama",
        hint: "Ime i delatnost",
        title: "Upoznajmo se",
        description: "Bilo da vodite lokalnu radnju ili kompaniju u rastu, sve počinje kratkim pozdravom.",
      },
      {
        label: "Vaš projekat",
        hint: "Šta vam treba",
        title: "Kakav projekat imate na umu?",
        description: "Dovoljna je i okvirna ideja. Detalje ćemo uobličiti zajedno.",
      },
      {
        label: "Reference",
        hint: "Opcioni linkovi",
        title: "Imate li nešto da nam pokažete?",
        description: "Sve je ovde opciono. Što više podelite, ponuda će biti bolje prilagođena.",
      },
      {
        label: "Kontakt",
        hint: "Kako da vas nađemo",
        title: "Gde da vam se javimo?",
        description: "Ostavite broj telefona, email ili oba. Kako vama najviše odgovara.",
      },
    ],
    fields: {
      name: { label: "Vaše ime", placeholder: "Marko Marković" },
      business: { label: "Delatnost ili kompanija", placeholder: "npr. stomatološka ordinacija, SaaS startap" },
      projectType: "Vrsta projekta",
      description: {
        label: "Opišite šta vam treba",
        placeholder: "npr. Sajt za moj salon sa uslugama, cenama i online zakazivanjem…",
      },
      timeline: "Kada biste želeli da počnete?",
      website: { label: "Trenutni sajt", placeholder: "vasbiznis.rs" },
      social: { label: "Instagram ili Facebook", placeholder: "@vasbiznis" },
      location: { label: "Lokacija na Google mapama", placeholder: "Link ili adresa" },
      links: { label: "Dizajn, dokumenti ili sajtovi koji vam se dopadaju", placeholder: "Figma, Google Drive, primeri sajtova…" },
      phone: { label: "Broj telefona", placeholder: "+381 65 123 4567" },
      email: { label: "Email", placeholder: "vi@vasbiznis.rs" },
    },
    projectTypes: { website: "Sajt", store: "Online prodavnica", app: "Web aplikacija / sistem", other: "Nešto drugo" },
    timelines: { asap: "Što je pre moguće", soon: "U naredna 1–2 meseca", exploring: "Za sada istražujem" },
    optional: "(opciono)",
    back: "Nazad",
    next: "Nastavi",
    send: "Pošalji upitnik",
    sending: "Šaljemo…",
    reviewAnswers: "Neke odgovore treba proveriti.",
    errors: {
      nameRequired: "Unesite svoje ime.",
      businessRequired: "Recite nam čime se bavite.",
      projectTypeRequired: "Izaberite opciju koja najbolje opisuje projekat.",
      descriptionTooShort: "Napišite još nekoliko reči (najmanje {min} karaktera).",
      timelineInvalid: "Izaberite jednu od opcija.",
      contactRequired: "Ostavite broj telefona ili email da bismo vas kontaktirali.",
      phoneInvalid: "Unesite ispravan broj telefona.",
      emailInvalid: "Unesite ispravnu email adresu.",
    },
    success: {
      title: "Hvala, {name}!",
      titleNoName: "Hvala!",
      body: "Primili smo vaš upitnik i javićemo vam se u roku od jednog radnog dana.",
      back: "Nazad na početnu",
    },
  },
};
