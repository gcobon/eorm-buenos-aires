import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css'],
})
export class ProfessorListComponent implements OnInit {
  public profesores = [
    {
      primerNombre: 'Fallon Garrett',
      segundoNombre: '1-145-303-9558',
      primerApellido: '',
      segundoApellido: 'P.O. Box 484, 5200 Malesuada Rd.',
      dpiProfesor: '83703',
      fechaNacimiento: new Date(),
      sexo: 'M',
      direccion:
        'justo. Proin non massa non ante bibendum ullamcorper. Duis cursus,',
      telefono: 55454858555,
      email: 'ipsum.phasellus@laciniaatiaculis.co.uk',
      idUsuario: 'FPH23UMY9GJ',
    },
    {
      primerNombre: 'Orlando Cruz',
      segundoNombre: '1-388-503-7733',
      primerApellido: '',
      segundoApellido: '250-6125 Non St.',
      dpiProfesor: '24803',
      fechaNacimiento: new Date(),
      sexo: 'F',
      direccion:
        'Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed',
      telefono: 358852,
      email: 'diam.pellentesque.habitant@dictumeleifend.edu',
      idUsuario: 'XIB36QRT0LD',
    },
    {
      primerNombre: 'Garth Osborne',
      segundoNombre: '1-538-743-8517',
      primerApellido: 'ac@interdumsed.co.uk',
      segundoApellido: 'P.O. Box 871, 7874 Ut, Road',
      dpiProfesor: '694434',
      fechaNacimiento: new Date(),
      sexo: 'F',
      direccion:
        'nulla magna, malesuada vel, convallis in, cursus et, eros. Proin',
      telefono: 25448888,
      email: 'ac@interdumsed.co.uk',
      idUsuario: 'UTU11XLM6HF',
    },
    {
      primerNombre: 'Chelsea Durham',
      segundoNombre: '(572) 718-5457',
      primerApellido: 'commodo@sed.ca',
      segundoApellido: '4945 Arcu Rd.',
      dpiProfesor: '58038',
      fechaNacimiento: new Date(),
      sexo: 'M',
      direccion:
        'lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed',
      telefono: 988555855,
      email: 'commodo@sed.ca',
      idUsuario: 'VSU04QSK2WM',
    },
    {
      primerNombre: 'Kim Maldonado',
      segundoNombre: '1-622-479-1433',
      primerApellido: 'lobortis.quis.pede@orciluctus.org',
      segundoApellido: '1468 Rutrum Av.',
      dpiProfesor: '128673',
      fechaNacimiento: new Date(),
      sexo: 'F',
      direccion:
        'purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula',
      telefono: 85545454,
      email: 'lobortis.quis.pede@orciluctus.org',
      idUsuario: 'UFN28XBP0QW',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
