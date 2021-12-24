import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'atob' })
export class AtobPipe implements PipeTransform {
  transform(base64: string) {
    return atob(base64);
  }
}
