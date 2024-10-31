import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../interfaces/project.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(projet: Project[], search: string): Project[] {
    if (search === undefined) return projet;
    return projet.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techno.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
    );
  }
}
