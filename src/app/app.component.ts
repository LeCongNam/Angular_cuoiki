import { Component, ViewChild } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { ContentComponent } from './content/content.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ContentComponent) content:any;

  title = 'Lecongnam_angular';
  itemProject:object={}
  constructor(private logger:LoggerService){}

  ngOnInit(){
    this.logger.log('đây là logger')
  }

  receiveMessage($event:any) {
    this.itemProject = $event;
    console.log( this.itemProject);
    
  }
  
}
