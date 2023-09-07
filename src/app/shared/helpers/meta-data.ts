const metaData: MetaData = {
    '/': {
      title: 'Portfolio | Delaunay Alexis ',
      metas: {
        description: 'Portfolio de Delaunay Alexis, étudiant et développeur web en alternance à MyDigitalSchool située à Angers.',
        'og:title': 'Portfolio',
        'og:description': 'Portfolio de Delaunay Alexis, étudiant et développeur web en alternance à MyDigitalSchool située à Angers.',
      },
    },
    '/cv': {
      title: 'CV | Delaunay Alexis',
      metas: {
        description: `Développeur web passionné et créatif, je suis actuellement en cours d'obtention d'un MBA Développeur Full Stack à MyDigitalSchool Angers.`,
        'og:title': 'Mon CV',
        'og:description': `Développeur web passionné et créatif, je suis actuellement en cours d'obtention d'un MBA Développeur Full Stack à MyDigitalSchool Angers.`,
      },
    },
    '/presentation': {
        title: 'Presentation | Delaunay Alexis',
        metas: {
          description: `Salut, je suis Alexis, j'ai 22 ans et je suis actuellement en 2ème année de Master Développeur Full Stack à MyDigitalSchool situé à Angers pour aquérir le plus de connaissance possible afin d'en faire mon métier.`,
          'og:title': 'Presentation',
          'og:description': `Salut, je suis Alexis, j'ai 22 ans et je suis actuellement en 2ème année de Master Développeur Full Stack à MyDigitalSchool situé à Angers pour aquérir le plus de connaissance possible afin d'en faire mon métier.`,
        },
      },
      '/presentation/voyage': {
        title: 'Voyage | Delaunay Alexis',
        metas: {
          description: `Voici la plupart des lieux ou je suis aller jusqu'à aujourd'hui.`,
          'og:title': 'Voyage',
          'og:description': `Voici la plupart des lieux ou je suis aller jusqu'à aujourd'hui.`,
        },
      },
      '/presentation/jeux-video': {
        title: 'Jeux Vidéo | Delaunay Alexis',
        metas: {
          description: `Grand joueur de jeux vidéo depuis enfant voici 4 jeux qui ont participée à ce que je suis aujourd'hui.`,
          'og:title': 'Voyage',
          'og:description': `Grand joueur de jeux vidéo depuis enfant voici 4 jeux qui ont participée à ce que je suis aujourd'hui.`,
        },
      },
      '/presentation/music': {
        title: 'Musique | Delaunay Alexis',
        metas: {
          description: `Passionnée de rap FR voici un échantillon de ce que j'écoute. #ValdFC`,
          'og:title': 'Ma musique',
          'og:description': `Passionnée de rap FR voici un échantillon de ce que j'écoute. #ValdFC`,
        },
      },
      '/projets': {
        title: 'Projets | Delaunay Alexis',
        metas: {
          description: `Voici quelques projets sur lesquels j'ai travailler. Beaucoup de sites vitrines en PHP WordPress Angular ou simplement du Javascript.`,
          'og:title': 'Mes projets',
          'og:description': `Voici quelques projets sur lesquels j'ai travailler. Beaucoup de sites vitrines en PHP WordPress Angular ou simplement du Javascript.`,
        },
      },
      '/contact': {
        title: 'Contact | Delaunay Alexis',
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
      metas: { description: string; 'og:title': string, 'og:description': string};
    };
  }
  
  export default metaData;