export interface AuthData {
  nombreUsuario: string;
  password: string;
  recuerdame?: boolean;
}

export interface AuthResponse {
  authorities: [];
  bearer: string;
  nombreUsuario: string;
  token: string;
}
