export interface Role {
  id?: number;
  rolNombre?: Authorities;
  checked?: boolean;
}

export type Authorities = 'ROLE_ADMIN' | 'ROLE_PROFESOR' | 'ROLE_ESTUDIANTE';
