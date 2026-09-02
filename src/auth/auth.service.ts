import { Injectable } from "@nestjs/common"; 
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {
  UsuarioAutenticado,
  UsuariosService,
} from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  // Método assíncrono capaz de validar o usuário com os campos email e senha.
  async validarUsuario(email: string, senha: string) {
    const usuario = this.usuariosService.buscarPorEmail(email);

    // Validação que verifica se existe um usuário, verifica se o usuário está ativo e verifica se a senha corresponde com primeira senha declarada.
    if(!usuario || !usuario.ativo) {
      return null;
    }

    // Constante que descriptografa a sennha do usuario e a retorna.
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    
    if(!senhaValida) {
      return null;
    }

    // Caso o usuário passe pela validação, esta constante irá armazernar a sua senha e todos os outros dados.
    const { senhaHash: _senhaHash, ...principal } = usuario;

    // Retorno de todos os outros dados do usuário exceto a senha.    
    return principal
  }

  login(usuario: UsuarioAutenticado) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}