import { HttpClient } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectServices extends BaseService{
   
    constructor(private inject:Injector){
        super(inject)
    }

    getProject(params:any){
        return this.get('/api/home',params)
    }

    addProject(body:any){
        return this.post('/api/create',body)
    }


    updateProject(id:any,body:any){
        return this.patch('/api/update/'+id,body)
    }
   

    deleteProject(params:any){
       return this.delete('/api/delete/'+params)
    }
}