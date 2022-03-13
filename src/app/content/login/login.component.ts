import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserServices } from '../../services/UserServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup | any
  router:Router |any
  constructor(private userServices:UserServices) { }

  ngOnInit(): void {
      this.initForm()
  }

  initForm() {
      this.userForm = new FormGroup({
          'user_name': new FormControl(null, [Validators.required,Validators.minLength(6)]),
          'password': new FormControl(null, [Validators.required,Validators.minLength(6)]),
      })
  }

  onSubmit(userForm:NgForm){
      if(userForm.status == 'VALID'){
          let dataToJson = JSON.stringify({...userForm.value})
          this.userServices.register(dataToJson)
              .then((res:any)=>{
                 Swal.fire({
                      'title':"Đăng nhập thành công",
                      'icon':'success'
                  })
                  this.router.navigate(['home']);
           
              })
              .catch(err=>{
                console.log(err);
                
                Swal.fire({
                  title:"Có lỗi bất ngờ xảy ra! Vui lòng thử lại",
                  icon:'error'
              })
              })
      }else{
        console.log(userForm);
        
          Swal.fire({
              'title':"Vui lòng kiểm tra lại thông tin!!!",
              'icon':'error'
          })
      }
  }

}
