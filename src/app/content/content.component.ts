import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectServices } from '../services/projectServices';
import { Project } from '../Model/project.model';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
    faTrash=faTrash
    faPen = faPen
    data: Project[] | any = [];
    inProgress: String = ""
    isShow: Boolean = true
    newData: Project[] | any = []
    projectItem: any = {}
    userName:String |any
    

    constructor(private projectServices: ProjectServices) {
        
     }

    ngOnInit(): void {
        this.loadProject()
    }

    loadProject() {
        this.projectServices.getProject({})
            .then((res: any) => {
                this.data = res
                this.isShow = false
                this.assignItem()
            })
            .catch(err => console.log(err))
            
            /* 
                + Lỗi: Không nhìn thấy tên user và avatar sau khi login. Cần phải  reload page
                + Issue: Xử lí bằng hàm này nhưng bị call liên tục
              */
                // window.location.reload()
    }

    
    isComplete(args: string = '') {

        if (args) {
            let string = 'complete'
            let searchStr = args.toLowerCase()
            let ind = string.lastIndexOf(searchStr)

            if (ind != -1) {
                return true
            }

            return false
        }
        return
    }

    isLate(args: string) {
        if(args){
            let string = 'late'
        let searchStr = args.toLowerCase()
        let ind = string.lastIndexOf(searchStr)

        if (ind != -1) {
            return true
        }
        return false
        }
        return
    }

    isInprogress(args: string) {
        if (args) {
            let string = 'in progress'
            let searchStr = args.toLowerCase()
            let ind = string.lastIndexOf(searchStr)
            if (ind != -1) {
                return true
            }
            return false
        }
        return
    }

    isData() {
        if (this.isShow) {
            return false
        }
        return true
    }

    deleteProject(id: any) {
        this.data = this.data.filter((item: any) => item._id != id)
        return this.projectServices.deleteProject(id)
         .then((res:any)=>Swal.fire({
            'title':"Xoá thành công",
            'icon':'success'
         }))
         .catch((res:any)=>Swal.fire({
            'title':"Xoá Xoá thất bại",
            'icon':'error'
         }))
    }

    sendItem(item: object) {
        this.projectItem = item
    }


    projectItems:any = []
    assignItem(){
       this.projectItems = Object.assign([],this.data)        
    }

    searchString:String=''
    search(value: any): any {
        let result = Object.assign([],this.data)
        this.searchString =value.toLowerCase()
        
        // search Result 
        result = result.filter((item:any)=>item.project_name.toLowerCase().indexOf(this.searchString) != -1)
        if (result.length != 0) {
            return  this.projectItems = result
        }

        if(this.searchString.trim() == ''){
            return  this.assignItem()
        }
        return   this.assignItem()
    }



    reloadPage(varReq:any){
        console.log(1);
        
            this.loadProject()
    }

}
