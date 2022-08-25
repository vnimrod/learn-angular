import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // pipe name for all the consumers
  name: 'shorten',
})

// good practice is to add the PipeTransform decorator to enforce the use of transform.
// transform method must be in the pipe
// limit - add another argument to our transform method, if we adding more arguments, then we consume it - shorten:15:{argument}:{argument} etc.
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
