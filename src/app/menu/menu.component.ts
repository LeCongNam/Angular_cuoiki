import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName:String|any

  constructor() { }

  ngOnInit(): void {
    let userJsonData = localStorage.getItem('userName')
    this.userName = userJsonData || 'user 1'
    console.log(this.userName);
  }

}
