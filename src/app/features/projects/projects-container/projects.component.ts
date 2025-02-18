import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/interfaces/project.interface';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('projet', [
      transition(
        ':enter',
        query('.card-project', [
          style({
            opacity: 0,
            transform: 'translateY(-25px)',
          }),
          stagger(200, animate('500ms 100ms')),
        ])
      ),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  public search: string;

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.projects = [
      {
        name: 'VALD FC',
        type: 'clone Netflix - API + frontend',
        techno: ['Angular', 'nodeJS', 'MongoDB', 'Docker'],
        img: '../../assets/images/vald-fc.png',
        description:
          "Projet personnel commencer en parallèle de mes études en 2ème année de master. Clone de Netflix sur toutes les interviews et clips de VALD. J'ai d'abord du créer l'API REST avant de m'attaquer au frontend et de déployer le tout sur un VPS via Docker.",
        siteweb: 'https://vald-fc.netlify.app/',
        github: 'https://github.com/Skitch49/vald-fc',
        dateRealisation: '2024',
      },
      {
        name: 'Tinder dogs',
        type: 'Site web',
        techno: ['Angular','TypeScript','SCSS'],
        img: '../../assets/images/tinder_dogs.png',
        description:
          'Mini projet pour recrée la fonctionnalité de swipe tinder grâce aux évenements mousedown, mousemove et mouseup, ainsi que leurs équivalents pour les appareils mobiles avec touch. Les animaux sont générer grâce à Dogs API. On peux retrouver les chiens likés et les filtrer par nom et les tier du plus récent au plus anciens et inversement. Le tout est stocker par le localStorage.',
        siteweb: 'https://tinder-dogs.alexis-delaunay.fr/home',
        github: 'https://github.com/Skitch49/tinder-dogs',

        dateRealisation: 'Février 2025',
      },
      {
        name: 'Lyric Card Maker',
        type: 'Site web',
        techno: ['Angular','TypeScript','SCSS'],
        img: '../../assets/images/lyrics-card-genius.png',
        description:
          'Mini projet pour recrée des lyrics card disponible sur l\'application IOS de genius en Angular.',
        siteweb: 'https://lyric-card-maker.alexis-delaunay.fr/',
        github: 'https://github.com/Skitch49/lyric-card-maker',

        dateRealisation: 'Janvier 2025',
      },
      {
        name: 'Voyages entre potes',
        type: 'Site web',
        techno: ['Javascript'],
        img: '../../assets/images/voyages_entre_potes.png',
        description:
          'Mini projet pour faire découvrir mes voyages fait avec mes amis.',
        siteweb: 'https://voyages-entre-potes.alexis-delaunay.fr/',
        github: 'https://github.com/Skitch49/lyric-card-maker',
        dateRealisation: 'Octobre 2024',
      },
      {
        name: 'Générateur de tap in',
        type: 'Tap In Generator',
        techno: ['Javascript'],
        img: '../../assets/images/tap_in_generator.png',
        description:
          "Mini projet pour générer des tweets populaires de twitter. Je ne suis pas l'auteur des tweet bien entendu...",
        siteweb: 'https://tap-in-generator.alexis-delaunay.fr/',
        github: 'https://github.com/Skitch49/tap-in-generator',
        dateRealisation: 'Septembre 2024',
      },
      {
        name: 'GTA 6 VS Miami',
        type: 'image slider comparaison',
        techno: ['Javascript'],
        img: '../../assets/images/gta_6_vs_miami.png',
        description:
          "Mini projet pour apprendre a faire des slider de comparaison via l'input range",
        siteweb: 'http://gta-6.alexis-delaunay.fr/',
        github: 'https://github.com/Skitch49/image-slider-comparison',
        dateRealisation: 'Septembre 2024',
      },
      
      {
        name: 'Lovely Nails by Prisci',
        type: 'Site Vitrine',
        techno: ['WordPress', 'PHP', 'Javascript'],
        img: '../../assets/images/lovely-nails.png',
        description:
          "Site WordPress fait pour un client à Saint-Nicolas-de-Bourgueil. Le site met en avant les différents produits proposés par l'onglerie. Les différents éléments sont personnalisable dans l'administration WordPress via ACF et le thème custom en PHP.",
        siteweb: 'https://lovely-nails-by-prisci.fr/',
        github: 'https://github.com/Skitch49/lovely-nails-by-prisci',
        dateRealisation: 'Mai 2024 - Juin 2024',
      },
      {
        name: 'Angers Loire Campus',
        type: 'Site vitrine + back-office',
        techno: ['WordPress', 'PHP', 'Javascript'],
        img: '../../assets/images/angers-loire-campus.png',
        description:
          "Ce projet m'a été confié lors de mon stage de bachelor par l'ESAIP. J'ai d'abord commencé par la partie back-office avec les fonctionnalités suivantes : Formulaire de connexion, Mot de passe oubliée, Création de dossiers, Stockage de fichier, Création Utilisateurs, Gestion des rôles. Puis j'ai fini mon stage par le site vitrine lorsque la maquette était prête c'est là que je me suis familliarisé avec Swiper JS qui est une librairie JS qui permet de créer des slilder moderne facilement.",
        siteweb: 'https://angersloirecampus.fr',
        github: 'https://github.com/Skitch49/Angers-Loire-Campus',
        dateRealisation: 'Juin 2022 - Septembre 2022',
      },
      {
        name: 'Sup Ouest Avenir',
        type: 'Site vitrine',
        techno: ['WordPress', 'PHP', 'React'],
        img: '../../assets/images/sup-ouest-avenir.png',
        description:
          "Pour ce site web je n'ai pas seulement créer un thème WordPress mais j'ai également créer une extension WordPress pour pouvoir créer des blocs gutemberg personnalisées pour que le client puisse maintenir à jour son site rapidement et facilement via l'éditeur WordPress avec des blocs intégrés nativement et les nouveaux que j'ai développé.",
        dateRealisation: 'Avril 2023',
      },
      {
        name: 'Logiciel Durable',
        type: 'Traitement de données',
        techno: ['PHP', 'Javascript'],
        img: '../../assets/images/logiciel-durable.png',
        description:
          "POC qui permet d'enregistrer des données de tests de logiciels dans la cadre d'une étude Écoresponsable.",
        siteweb: 'https://logiciel-durable.esaip.org',
        dateRealisation: 'Mai 2023 - Juillet 2023',
      },
      {
        name: 'Portfolio',
        type: 'Site vitrine',
        techno: ['Angular', 'SCSS', 'TypeScript'],
        img: '../../assets/images/portfolio.png',
        description:
          "Lorsque j'ai décidé de me lancer dans l'apprentissage du Framework front-end Angular, je me suis dis pourquoi pas m'entrainer avec la création d'un Portfolio. Et c'est ainsi que mon Portfolio a vue le Jour même si je reste concient qu'un framework n'est pas le plus adapter pour un simple Portfolio. Je me suis aidez de material pour la création du site qui est disponible en PWA.",
        github: 'https://github.com/Skitch49/Portfolio',
        dateRealisation: 'Septembre 2023',
      },
      {
        name: 'Clone SWAPI',
        type: 'API',
        techno: ['nodeJS', 'swagger', 'MongoDB'],
        img: '../../assets/images/logo-mds.png',
        description: 'Projet de première année de master à MDS situé à Angers.',
        github: 'https://github.com/Skitch49/SWAPI',
        dateRealisation: '2023',
      },
      {
        name: 'Password Guesser',
        type: 'Algorithme',
        techno: ['POO', 'Python'],
        img: '../../assets/images/logo-mds.png',
        description: 'Projet de première année de master à MDS situé à Angers.',
        github: 'https://github.com/Skitch49/POO_Password_Guesser',
        dateRealisation: '2023',
      },
      {
        name: 'Progressive Web Application',
        type: 'PWA',
        techno: ['VueJS'],
        img: '../../assets/images/logo-mds.png',
        description: 'Projet de première année de master à MDS situé à Angers.',
        dateRealisation: '2023',
      },
      {
        name: 'Algina',
        type: 'Site vitrine',
        techno: ['WordPress', 'PHP', 'Bootstrapp', 'Javascript'],
        img: '../../assets/images/algina.jpg',
        description:
          "Lors de mon stage de BTS j'ai appris à créer des thèmes WordPress Personnalisés grâce à l'entreprise Azerty Consulting au sein d'Angers French Tech. Le site web Algina aura été mon tout premier projet.",
        dateRealisation: 'Février 2021',
      },
    ];
  }

  openDialog(project) {
    this.dialog.open(DialogComponent, {
      data: {
        project,
      },
    });
  }
}
