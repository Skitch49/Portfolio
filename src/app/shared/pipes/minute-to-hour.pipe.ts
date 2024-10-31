import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteToHour',
})
export class MinuteToHourPipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '';

    const hours = Math.floor(value / 60);
    const minutes = value%60;
    if (hours > 1) {
      return `${hours} heures et ${minutes} min`;
    } else if (minutes>=1) {
      return `${hours} heure et ${minutes} min`;
    }else{
      return`Aucun`
    }
  }
}
