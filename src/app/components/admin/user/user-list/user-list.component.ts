import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public usuarios = [
    {
      id_usuario: 1,
      usuario: 'juan',
      password: '123456',
      enabled: true,
      rol: 'profesor',
    },
    {
      id_usuario: 2,
      usuario: 'jose',
      password: '123456',
      enabled: true,
      rol: 'estudiante',
    },
    {
      id_usuario: 3,
      usuario: 'ricardo',
      password: '123456',
      enabled: true,
      rol: 'estudiante',
    },
    {
      id_usuario: 4,
      usuario: 'maria',
      password: '123456',
      enabled: true,
      rol: 'profesor',
    },
    {
      id_usuario: 5,
      usuario: 'josefina',
      password: '123456',
      enabled: false,
      rol: 'profesor',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
