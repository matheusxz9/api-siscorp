import { Injectable, NotFoundException } from '@nestjs/common';

type StatusSolicitacao = 'pendente' | 'aprovada';

type Solicitacao = {
  id: number;
  titulo: string;
  status: StatusSolicitacao;
};

@Injectable()
export class SolicitacoesService {
  private readonly solicitacoes: Solicitacao[] = [
    { id: 1, titulo: 'Aquisição de notebook', status: 'pendente' },
    { id: 2, titulo: 'Licença de software', status: 'aprovada' },
    { id: 3, titulo: 'Cadeira ergonômica', status: 'pendente' },
  ];

  buscarPorId(id: number) {
    const solicitacao = this.solicitacoes.find((s) => s.id === id);

    if (!solicitacao) {
      throw new NotFoundException("Solicitação não encontrada");
    }

    return solicitacao;
  }

  aprovar(id: number) {
    const solicitacao = this.buscarPorId(id);
    solicitacao.status = 'aprovada';
    return solicitacao;
  }

  relatorio() {
    const total = this.solicitacoes.length;
    const porStatus = this.solicitacoes.reduce(
      (contagem, solicitacao) => {
        contagem[solicitacao.status] = (contagem[solicitacao.status] ?? 0) + 1;
        return contagem;
      },
      {} as Record<StatusSolicitacao, number>,
    );

    return { total, porStatus };
  }
}
