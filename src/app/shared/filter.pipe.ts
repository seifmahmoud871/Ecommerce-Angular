import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[],filterString:string,propName:string):any[]{

    const result:any=[];
    if(!value||filterString===""||propName===""){
        return value;
    }
    value.forEach((res:any)=>{
       if(res[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(res);
       }
    });
    return result;
  }

}
