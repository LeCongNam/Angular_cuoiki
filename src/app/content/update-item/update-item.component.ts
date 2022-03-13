import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProjectServices } from '../../services/projectServices';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  myValue: number = 0
  selectedRam: number = 0
  event: any = 0
  projectForm: FormGroup | any
  projectItem: any = {}



  @Input() item: object = {};


  constructor(private projectServices: ProjectServices) { }
  ngOnInit(): void {
    this.projectItem.progress = 0
    this.initForm()
  }
  initForm() {
    this.projectForm = new FormGroup({
      'project_name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'day_complete': new FormControl(null, [Validators.required]),
      'day_start': new FormControl(null, [Validators.required]),
      'progress': new FormControl(0, [Validators.required]),
      'author': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'state': new FormControl(null, [Validators.required]),
    })
  }

  getSliderValue(event: any = 0) {
    this.myValue = event.target.value
    console.log(this.myValue);
  }


  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'item') {
        this.projectItem = this.item
        this.projectItem.day_complete = new Date(this.projectItem.day_complete).toISOString().slice(0, 10)
        this.projectItem.day_start = new Date(this.projectItem.day_start).toISOString().slice(0, 10)
        this.myValue = this.projectItem.progress
      }
    }
  }

  onSubmit(projectForm:NgForm){
    if(projectForm.status == 'VALID'){
      let id =  this.projectItem._id
      
        let dataToJson = JSON.stringify({...projectForm.value})
        this.projectServices.updateProject(id,dataToJson)
            .then((res:any)=>{
               Swal.fire({
                    'title':"Cập nhật project thành công: ",
                    'icon':'success'
                })
                this.projectItem.project_name = 'Người thực hiện'
                this.projectItem.day_complete = ''
                this.projectItem.day_start = ''
                this.projectItem.progress = 0
                this.projectItem.author = ''
                this.projectItem.state = ''
            })
            .catch(err=>{
              Swal.fire({
                title:"Lỗi khi thêm project! Vui lòng thử lại",
                icon:'error'
            })
            console.log(err);
            
            })
    }else{
        Swal.fire({
            'title':"Vui lòng kiểm tra lại thông tin",
            'icon':'error'
        })
    }
}



}
