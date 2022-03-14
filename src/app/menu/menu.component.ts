import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName:any=""

  constructor() { }

  ngOnInit(): void {
    let usrLocal = JSON.parse(localStorage.getItem('userName')|| '')
    this.userName = usrLocal
  }

}
