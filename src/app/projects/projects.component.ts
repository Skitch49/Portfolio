import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/interfaces/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  public search: string;
  ngOnInit(): void {
    this.projects = [
      {
        id: 1,
        name: 'Algina',
        type: 'Site vitrine',
        techno: 'WordPress PHP Bootstrapp',
        description: 'test',
        img: '../../assets/images/algina.jpg',
      },
      {
        id: 2,
        name: 'Angers Loire Campus',
        type: 'Site vitrine + gestionnaire de fichier',
        techno: 'WordPress PHP JS',
        description: 'test',
        img: '../../assets/images/angers-loire-campus.png',
      },
      {
        id: 3,
        name: 'Sup Ouest Avenir',
        type: 'Site vitrine',
        techno: 'WordPress PHP React',
        description: 'test',
        img: '../../assets/images/sup-ouest-avenir.png',
      },
      {
        id: 3,
        name: 'Portfolio',
        type: 'Site vitrine',
        techno: 'Angular SCSS TypeScript',
        description: 'test',
        img: '../../assets/images/portfolio.png',
      },
    ];
  }
}
