import prismaClient from "../../prisma";

interface OrederRequest{
    // status: boolean;
    // draft: boolean; // Rascunho
    colaborado_id: string;
    cliente_id: string
    caixa_id: string
}

class CreateOrderService{
    async execute({ colaborado_id, cliente_id, caixa_id }: OrederRequest){

        const caixaAberto = await prismaClient.caixa.findFirst({
            where: {
                id: caixa_id
            },
            select:{
                status: true,
            },
        });

        if(!caixa_id){
            throw new Error('Informe um caixa');
        }

        if(!caixaAberto){
            throw new Error('Caixa inválido')
        }

        if(caixaAberto.status === false){
            throw new Error('Caixa fechado')
        }

        // VERIFICANDO SE O COLABORADOR É GERENTE OU VENDEDOR
        const colaborador = await prismaClient.colaborador.findFirst({
            where:{
                id: colaborado_id,
            },
            select: {
                cargo: true,
                usuario: {
                    select:{
                        nome: true,
                    }
                }
            }
        });

        if(!colaborado_id){
            throw new Error('Informe um colaborador');
        }

        if(!colaborador){
            throw new Error('Colaborador inválido');
        }

        if(colaborador.cargo === 'CAIXA'){
            throw new Error('Colaborador sem altorização para abrir um pedido');
        }

        //VERIFICAR SE O CLIENTE ESTÁ CADASTRADO
        const cliente = await prismaClient.cliente.findFirst({
            where: {
                id: cliente_id,
            },
            select: {
                usuario: {
                    select: {
                        nome: true,
                    }
                }
            }
        })
        
        if(!cliente_id){
            throw new Error('Informe um cliente');
        }

        if(!cliente){
            throw new Error('Cliente inválido');
        }

        const order = await prismaClient.order.create({
            data: {
                colaborador_id: colaborado_id,
                cliente_id: cliente_id,
                caixa_id: caixa_id
            },
        });

        return order;
    }
}

export { CreateOrderService }