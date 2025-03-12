import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength',
})
export class MaxLengthPipe implements PipeTransform {
  transform(value: string, maxLength: number = 60): unknown {
    if (!value) return '';
    const trimmedValue = value.substring(0, maxLength);
    const lastSpaceIndex = trimmedValue.lastIndexOf(' ');
    return lastSpaceIndex > 0
      ? trimmedValue.substring(0, lastSpaceIndex) + '...'
      : trimmedValue + '...';
  }
}