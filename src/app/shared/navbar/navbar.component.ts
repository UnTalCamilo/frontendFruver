import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  user: any;
  msgError = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    
  }
  /**
   *  isLogged
   * 
   * @returns 
   */
  isLogged() {
    return this.authService.isLogged();
  }

  /**
   * @name onSubmit
   *  Funcion ue envia los datos de inicio de sesion al serivicio auth
   */

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value);
    }

  }

  /**
   * @name logout
   * Funcion que llama al servicio auth para cerrar sesion
   */
  logout() {
    this.authService.logout();
  }


  /**
   * @name seachProduct
   * Funcion que busca un producto en base a su nombre
   * no esta implementada
   */
  seachProduct() {
    let nombre = (<HTMLInputElement>document.getElementById('search')).value;
    console.log(nombre);
  }

}
