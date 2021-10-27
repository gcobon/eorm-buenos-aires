import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public estudiantes = [
    {
      primerNombre: 'Fallon',
      segundoNombre: 'Garrett',
      primerApellido: 'Stephens',
      segundoApellido: 'Dorsey',
      fechaNacimiento: new Date(),
      sexo: 'M',
      direccion:
        'justo. Proin non massa non ante bibendum ullamcorper. Duis cursus,',
      lateralidad: 55454858555,
      email: 'ipsum.phasellus@laciniaatiaculis.co.uk',
      idUsuario: 'FPH23UMY9GJ',
    },
    {
      primerNombre: 'Orlando',
      segundoNombre: 'Cruz',
      primerApellido: 'Wing',
      segundoApellido: 'Kelly',
      fechaNacimiento: new Date(),
      sexo: 'F',
      direccion:
        'Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed',
      lateralidad: 358852,
      email: 'diam.pellentesque.habitant@dictumeleifend.edu',
      idUsuario: 'XIB36QRT0LD',
    },
    {
      primerNombre: 'Garth',
      segundoNombre: 'Osborne',
      primerApellido: 'Samantha',
      segundoApellido: 'Stephens',
      fechaNacimiento: new Date(),
      sexo: 'F',
      direccion:
        'nulla magna, malesuada vel, convallis in, cursus et, eros. Proin',
      lateralidad: 25448888,
      email: 'ac@interdumsed.co.uk',
      idUsuario: 'UTU11XLM6HF',
    },
    {
      primerNombre: 'Chelsea ',
      segundoNombre: 'Durham',
      primerApellido: 'Griffith',
      segundoApellido: 'Cochran',
      fechaNacimiento: new Date(),
      sexo: 'M',
      direccion:
        'lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed',
      lateralidad: 988555855,
      email: 'commodo@sed.ca',
      idUsuario: 'VSU04QSK2WM',
    },
    {
      primerNombre: 'Kim ',
      segundoNombre: 'Maldonado',
      primerApellido: 'Jackson',
      segundoApellido: 'Regina',
      fechaNacimiento: new Date(),
      sexo: 'F',
      direccion:
        'purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula',
      lateralidad: 85545454,
      email: 'lobortis.quis.pede@orciluctus.org',
      idUsuario: 'UFN28XBP0QW',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
