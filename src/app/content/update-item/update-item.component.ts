import { Component, Input, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
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
  isReload:Boolean|any= true

  @Output() reloadPage = new EventEmitter<boolean>()

  @Input() item: object = {};
  project_name: any;
  progress: number = 0;
  author: any;
  state: any;


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
        this.myValue = this.projectItem.progress
        this.project_name = this.projectItem.project_name
        this.progress = this.projectItem.progress
        this.author = this.projectItem.author
        this.state = this.projectItem.state

        if(this.projectItem.day_complete){
          this.projectItem.day_complete = new Date(this.projectItem.day_complete).toISOString().slice(0, 10)
          this.projectItem.day_start = new Date(this.projectItem.day_start).toISOString().slice(0, 10)
        }
      }
    }
  }

  onSubmit(projectForm: NgForm) {
    console.log(projectForm.value);

    if (projectForm.status == 'VALID') {
      let id = this.projectItem._id

      let dataToJson = JSON.stringify({ ...projectForm.value })
      this.projectServices.updateProject(id, dataToJson)
        .then((res: any) => {
          Swal.fire({
            'title': "Cập nhật project thành công: ",
            'icon': 'success'
          })
          this.projectItem.day_complete = ''
          this.projectItem.day_start = ''
          this.project_name = 'Người thực hiện'
          this.progress = 0
          this.author = ''
          this.state = ''
          this.sendRequestReload()
        })
        .catch(err => {
          Swal.fire({
            title: "Lỗi khi thêm project! Vui lòng thử lại",
            icon: 'error'
          })
          console.log(err);
        })
    } else {
      Swal.fire({
        'title': "Vui lòng kiểm tra lại thông tin",
        'icon': 'error'
      })
    }
  }

  sendRequestReload(){
    this.reloadPage.emit(this.isReload)
  }



}
