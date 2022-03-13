import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProjectServices } from '../services/projectServices';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
    selectedRam: number = 0
    myValue: any = 0
    event: any = 0
    projectForm: FormGroup | any

    constructor(private projectServices:ProjectServices) { }

    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.projectForm = new FormGroup({
            'project_name': new FormControl(null, [Validators.required,Validators.minLength(6)]),
            'day_complete': new FormControl(null, [Validators.required]),
            'day_start': new FormControl(null, [Validators.required]),
            'progress': new FormControl(0, [Validators.required]),
            'author': new FormControl(null, [Validators.required,Validators.minLength(6)]),
            'state': new FormControl(null, [Validators.required]),
        })
    }

    onSubmit(projectForm:NgForm){
        if(projectForm.status == 'VALID'){
            let dataToJson = JSON.stringify({...projectForm.value})
            this.projectServices.addProject(dataToJson)
                .then((res:any)=>{
                   Swal.fire({
                        'title':"Cập nhật thành công",
                        'icon':'success'
                    })
             
                    
                    this.projectForm.get('project_name').setValue('')
                    this.projectForm.get('day_complete').setValue('')
                    this.projectForm.get('day_start').setValue('')
                    this.projectForm.get('progress').setValue(0)
                    this.projectForm.get('author').setValue('')
                    this.projectForm.get('state').setValue('')
                })
                .catch(err=>Swal.fire({
                    title:"Lỗi khi cập nhật project! Vui lòng thử lại",
                    icon:'error'
                }))
        }else{
            Swal.fire({
                'title':"Vui lòng kiểm tra lại thông tin",
                'icon':'error'
            })
        }
    }



}
