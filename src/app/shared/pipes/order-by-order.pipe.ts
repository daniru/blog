import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByOrder',
  pure: false
})
export class OrderByOrderPipe implements PipeTransform {

  transform(value: any[]): any {
    return value.sort((a, b) => { return a.value ? a.value.order - b.value.order : a.order - b.order; });
  }
}
