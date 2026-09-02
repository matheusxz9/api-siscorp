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
    let pendente = 0;
    let aprovada = 0;

    for (const solicitacao of this.solicitacoes) {
      if (solicitacao.status === 'pendente') {
        pendente++;
      } else {
        aprovada++;
      }
    }

    return {
      total: this.solicitacoes.length,
      porStatus: { pendente, aprovada },
    };
  }
}
