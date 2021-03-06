import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // return (this.usuarioService.rol === "ADMIN_ROLE") ? true : false

    if (this.usuarioService.rol === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl("/dashboard")
      return false
    }

  }

}
