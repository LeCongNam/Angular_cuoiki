import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(mess:any){
      console.log(mess);
  }

  err(mess:string){
    console.error(mess);
    
  }
}
