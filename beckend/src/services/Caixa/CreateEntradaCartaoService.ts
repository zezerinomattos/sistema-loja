import prismaClient from "../../prisma";

interface EntradaCartaoRequest{
    colaborador_id: string;
    valor_entrada: number;
    motivo: string;
    obs: string;
    cliente_paga_juros: boolean;
    caixa_id: string;
}

class CreateEntradaCartaoService{
    async execute({ colaborador_id, valor_entrada, motivo, obs, cliente_paga_juros, caixa_id }: EntradaCartaoRequest){
        try {
            
            const entradaCartao = await prismaClient.entradaCartao.create({
                data: {
                    colaborador_id,
                    valor_entrada,
                    motivo,
                    obs,
                    cliente_paga_juros,
                    caixa_id,
                }
            });
    
            return entradaCartao;

        } catch (error) {
            console.log(error);
        }
    }
}

export { CreateEntradaCartaoService }