import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ApiUrl = 'http://localhost:3000';
  user = this.isLogged();

  constructor(public http: HttpClient) { }

  /**
   * @name login
   * Funcion que realiza la peticion al servidor para logearse
   * registra el token en el localstorage
   * @param user 
   * @returns 
   * 
   */

  login(user: any) {
    firstValueFrom(this.http.post(`${this.ApiUrl}/login`, user)).then(
      (res: any) => {
        console.log(res);

        if (res.token) {
          localStorage.setItem('token', res.token);
          window.location.reload();
        }
      }, (err) => {
        console.log(err);
      }
    )

  }

  /**
   * @name decodeToken
   * Funcion que decodifica el token y lo retorna
   * @returns objeto con el token decodificado
   */
  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);

      return JSON.parse(payloadDecoded);

    }
    return null;
  }


  /**
   * @name logout
   * Funcion que elimina el token del localstorage
   * @returns 
   */
  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  /**
   * @name isLogged 
   * Funcion que verifica si el usuario esta logeado  
   * @returns rol de usuario, en caso de no estar logeado retorna GUEST
   */
  isLogged() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.decodeToken();
    }
    return {

      rol: 'GUEST'
    }

  }


  /**
   * @name isLoggedIn
   * Funcion que verifica si el usuario esta logeado
   * @returns true si esta logeado, false si no esta logeado
   */

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

}
