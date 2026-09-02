import { Injectable, UnauthorizedException } from "@nestjs/common"; 
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable() 

// Definição da classe da estratégia local, ela herdará características da classe global PassportStrategy
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'senha'});
  }

  // Método assíncrono responsável pela validação do usuário.
  async validate(email: string, senha: string) {
    const usuario = await this.authService.validarUsuario(email, senha);

    if(!usuario) {
      throw new UnauthorizedException("Credenciais Inválidas");
    } 

    return usuario;
  } 
}