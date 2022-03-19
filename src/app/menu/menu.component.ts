import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName:String|any
  isShowdropDown:Boolean = false
  constructor() { }

  ngOnInit(): void {
    let userJsonData = localStorage.getItem('userName')
    this.userName = userJsonData || ''
    console.log(this.userName);
  }



  showDropdown(){
      return this.isShowdropDown = !this.isShowdropDown
  }

  logout(){
      localStorage.setItem('userName','')
      localStorage.setItem('token','')
      location.reload();
  }
}
