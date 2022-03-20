import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserServices } from '../../services/UserServices';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup | any

  constructor(private userServices:UserServices) { }

  ngOnInit(): void {
      this.initForm()
  }

  initForm() {
      this.userForm = new FormGroup({
          'user_name': new FormControl(null, [Validators.required,Validators.minLength(6)]),
          'email': new FormControl(null, [Validators.required,Validators.email]),
          'password': new FormControl(null, [Validators.required,Validators.minLength(6)]),
      })
  }

  onSubmit(userForm:NgForm){
      if(userForm.status == 'VALID'){
          let dataToJson = JSON.stringify({...userForm.value})
          this.userServices.register(dataToJson)
              .then((res:any)=>{
                 Swal.fire({
                      'title':"Đăng kí thành công",
                      'icon':'success'
                  })
           
              })
              .catch(err=>Swal.fire({
                  title:"Có lỗi bất ngờ xảy ra! Vui lòng thử lại",
                  icon:'error'
              }))
      }else{
          Swal.fire({
              'title':"Vui lòng kiểm tra lại thông tin!!!",
              'icon':'error'
          })
      }
      
  }
}
