import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private httpClient: HttpClient | any
  private urlApi = 'https://angularapp0612.herokuapp.com'
  private header: HttpHeaders | any;

  constructor(private injectable: Injector) {
    if (this.injectable) {
      this.httpClient = this.injectable.get(HttpClient)
      this.header = new HttpHeaders().set('Content-Type', 'application/json');
    }
  }


  public get(path: string, param: any) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.get(this.urlApi + path, { params: param })
          .subscribe((res: any) => {
            resolve(res)
          })
      } catch (error) {
        reject(error)
      }
    })

  }


  public post(path:string="", body:any) {
    return new Promise((resolve, reject) => {
       try {
          this.httpClient.post(this.urlApi+path, body, {headers:this.header})
          .subscribe((res:any) => {
            resolve(res);
          })
       } catch(error) {
          reject(error);
       }
    })
 }

 public patch(path:string="", body:any) {
  
  return new Promise((resolve, reject) => {
     try {
        this.httpClient.patch(this.urlApi+path, body, {headers:this.header})
        .subscribe((res:any) => {
           resolve(res);
        })
     } catch(error) {
        reject(error);
     }
  })
}


  public delete(path: string = "") {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.delete(this.urlApi + path, { headers: this.header })
          .subscribe((res: any) => {
            resolve(res);
          })
      } catch (error) {
        reject(error);
      }
    })
  }


}
