import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/shared/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private classService:ClassService) { }

  ngOnInit(): void {
  }

}
