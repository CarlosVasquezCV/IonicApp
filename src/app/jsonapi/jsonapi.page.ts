import { Component, OnInit } from '@angular/core';
import { JsonService } from '../servicios/json.service';

@Component({
  selector: 'app-jsonapi',
  templateUrl: './jsonapi.page.html',
  styleUrls: ['./jsonapi.page.scss'],
})
export class JsonapiPage implements OnInit {

  jsonData: any;

  constructor(private jsonService: JsonService) { }

  ngOnInit() {
    this.jsonService.getJsonData().subscribe((data: any) => {
      this.jsonData = data;
    })
  }

}
