import { Controller, Get, Param, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SolicitacoesService } from './solicitacoes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoes: SolicitacoesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('gestor', 'auditor')
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacoes.buscarPorId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('gestor')
  @Patch(':id/aprovar')
  aprovar(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacoes.aprovar(id);
  }
}
