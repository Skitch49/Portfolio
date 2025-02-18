const metaData: MetaData = {
  '': {
    title: 'Portfolio | Alexis Delaunay',
    metas: {
      description:
        'Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Bienvenue sur mon Portfolio !',
      'og:title': 'Portfolio',
      'og:description':
        'Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Bienvenue sur mon Portfolio !',
    },
  },
  '/': {
    title: 'Portfolio | Alexis Delaunay',
    metas: {
      description:
        'Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Bienvenue sur mon Portfolio !',
      'og:title': 'Portfolio',
      'og:description':
        'Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Bienvenue sur mon Portfolio !',
    },
  },
  '/cv': {
    title: 'Mon CV',
    metas: {
      description: `Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Voici mon CV et ma lettre de motiv !`,
      'og:title': 'Mon CV',
      'og:description': `Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Voici mon CV et ma lettre de motiv !`,
    },
  },
  '/presentation': {
    title: 'Presentation | Alexis Delaunay',
    metas: {
      description: `Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Bienvenue sur ma page de présentation !`,
      'og:title': 'Presentation',
      'og:description': `Alexis Delaunay - Développeur Full stack passionné et créatif située à Angers. Bienvenue sur ma page de présentation !`,
    },
  },
  '/presentation/voyage': {
    title: 'Mes Voyages',
    metas: {
      description: `Voici tous mes voyages sur une carte !`,
      'og:title': 'Mes Voyages',
      'og:description': `Voici tous mes voyages sur une carte !`,
    },
  },
  '/presentation/jeux-video': {
    title: 'Jeux Vidéo',
    metas: {
      description: `Grand joueur de jeux vidéos depuis enfant voici quelques infos sur ma passion de gamer.`,
      'og:title': 'Jeux Vidéo',
      'og:description': `Grand joueur de jeux vidéo depuis enfant voici 4 jeux qui ont participée à ce que je suis aujourd'hui.`,
    },
  },
  '/presentation/music': {
    title: 'Musique',
    metas: {
      description: `Passionnée de rap FR voici un échantillon de ce que j'écoute. #ValdFC`,
      'og:title': 'Musique',
      'og:description': `Passionnée de rap FR voici un échantillon de ce que j'écoute. #ValdFC`,
    },
  },
  '/projets': {
    title: 'Mes Projets',
    metas: {
      description: `Voici une sélection de projets sur lesquels j'ai travaillé, illustrant mon parcours.
De la création de sites vitrines avec JavaScript, PHP et WordPress, à des projets plus complexes développés en Angular et bientot en Symfony.`,
      'og:title': 'Mes projets',
      'og:description': `Voici une sélection de projets sur lesquels j'ai travaillé, illustrant mon parcours.
De la création de sites vitrines avec JavaScript, PHP et WordPress, à des projets plus complexes développés en Angular et bientot en Symfony.`,
    },
  },
  '/contact': {
    title: 'Contact',
    metas: {
      description: `Si tu as une question n'hésite pas le formulaire est fait pour ça !`,
      'og:title': 'Contactez moi !',
      'og:description': `Si tu as une question n'hésite pas le formulaire est fait pour ça !`,
    },
  },
};

interface MetaData {
  [chemin: string]: {
    title: string;
    metas: {
      description: string;
      'og:title': string;
      'og:description': string;
    };
  };
}

export default metaData;
