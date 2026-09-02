import { Module } from '@nestjs/common';
import { SolicitacoesController } from './solicitacoes.controller';
import { SolicitacoesService } from './solicitacoes.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService]
})
export class SolicitacoesModule { }
