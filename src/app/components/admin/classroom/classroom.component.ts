import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  constructor(private classroomService:ClassroomService) { }

  ngOnInit(): void {




  }

}
