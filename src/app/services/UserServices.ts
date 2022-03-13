import { HttpClient } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class UserServices extends BaseService{
   
    constructor(private inject:Injector){
        super(inject)
    }

    register(body:any){
        return this.post('/api/register',body)
    }


    login(body:any){
        return this.post('/api/login',body)
    }


    
   

}