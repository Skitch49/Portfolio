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
        id: 1,
        name: 'Algina',
        type: 'Site vitrine',
        techno: ['WordPress', 'PHP', 'Bootstrapp', 'JS'],
        img: '../../assets/images/algina.jpg',
        description:
          "Lors de mon stage de BTS j'ai appris à créer des thèmes WordPress Personnalisés grâce à l'entreprise Azerty Consulting au sein d'Angers French Tech. Le site web Algina aura été mon tout premier projet.",
        dateRealisation: 'Février 2021',
      },
      {
        id: 2,
        name: 'Angers Loire Campus',
        type: 'Site vitrine + back-office',
        techno: ['WordPress', 'PHP', 'JS'],
        img: '../../assets/images/angers-loire-campus.png',
        description:
          "Ce projet m'a été confié lors de mon stage de bachelor par l'ESAIP. J'ai d'abord commencé par la partie back-office avec les fonctionnalités suivantes : Formulaire de connexion, Mot de passe oubliée, Création de dossiers, Stockage de fichier, Création Utilisateurs, Gestion des rôles. Puis j'ai fini mon stage par le site vitrine lorsque la maquette était prête c'est là que je me suis familliarisé avec Swiper JS qui est une librairie JS qui permet de créer des slilder moderne facilement.",
        siteweb: 'https://angersloirecampus.fr',
        github: 'https://github.com/Skitch49/Angers-Loire-Campus',
        dateRealisation: 'Juin 2022 - Septembre 2022',
      },
      {
        id: 3,
        name: 'Sup Ouest Avenir',
        type: 'Site vitrine',
        techno: ['WordPress', 'PHP', 'React'],
        img: '../../assets/images/sup-ouest-avenir.png',
        description:
          "Pour ce site web je n'ai pas seulement créer un thème WordPress mais j'ai également créer une extension WordPress pour pouvoir créer des blocs gutemberg personnalisées pour que le client puisse maintenir à jour son site rapidement et facilement via l'éditeur WordPress avec des blocs intégrés nativement et les nouveaux que j'ai développé.",
        siteweb: 'https://supouestavenir.org',
        dateRealisation: 'Avril 2023',
      },
      {
        id: 5,
        name: 'Logiciel Durable',
        type: 'Traitement de données',
        techno: ['PHP', 'JS'],
        img: '../../assets/images/logiciel-durable.png',
        description:
          "POC qui permet d'enregistrer des données de tests de logiciels dans la cadre d'une étude Écoresponsable.",
        siteweb: 'https://logiciel-durable.esaip.org',
        github: 'https://github.com/Skitch49/POOC-Logiciel-Durable-ESAIP',
        dateRealisation: 'Mai 2023 - Juillet 2023',
      },
      {
        id: 6,
        name: 'Portfolio',
        type: 'Site vitrine',
        techno: ['Angular', 'SCSS', 'TypeScript'],
        img: '../../assets/images/portfolio.png',
        description:
          "Lorsque j'ai décidé de me lancer dans l'apprentissage du Framework front-end Angular, je me suis dis pourquoi pas m'entrainer avec la création d'un Portfolio. Et c'est ainsi que mon Portfolio a vue le Jour même si je reste concient qu' gros framework n'est pas le plus adapter pour un simple Portfolio. Je me suis aidez de material pour la création du site qui est disponible en PWA.",
        github: 'https://github.com/Skitch49/Portfolio',
        dateRealisation: 'Septembre 2023',
      },
      {
        id: 7,
        name: 'Clone SWAPI',
        type: 'API',
        techno: ['nodeJS', 'swagger', 'MongoDB'],
        img: '../../assets/images/logo-mds.png',
        description: 'Projet de première année de master à MDS situé à Angers.',
        github: 'https://github.com/Skitch49/SWAPI',
        dateRealisation: '2023',
      },
      {
        id: 8,
        name: 'Password Guesser',
        type: 'Algorithme',
        techno: ['POO', 'Python'],
        img: '../../assets/images/logo-mds.png',
        description: 'Projet de première année de master à MDS situé à Angers.',
        github: 'https://github.com/Skitch49/POO_Password_Guesser',
        dateRealisation: '2023',
      },
      {
        id: 9,
        name: 'Progressive Web Application',
        type: 'PWA',
        techno: ['VueJS'],
        img: '../../assets/images/logo-mds.png',
        description: 'Projet de première année de master à MDS situé à Angers.',
        dateRealisation: '2023',
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
