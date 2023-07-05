import prismaClient from "../../prisma";

interface CrediarioRequest{
    crediario_id: string;
}

class DetailCrediarioService{
    async execute({ crediario_id }: CrediarioRequest){

        if(!crediario_id){
            throw new Error('Informe o Id do crediario');
        }

        const crediario = await prismaClient.crediario.findFirst({
            where: {
                id: crediario_id,
            },
            include:{
                parcelasCrediario: true,
                cliente:{
                    select: {
                        usuario:{
                            select: {
                                nome: true,
                                cpf: true,
                            },
                        },
                        celular: true,
                    },
                },
                caixa: {
                    select: {
                        id: true,
                        colaborador_id: true,
                        colaborador:{
                            select:{
                                usuario:{
                                    select:{
                                        nome: true
                                    },
                                },
                            },
                        },
                    },
                },
                registroCaixa: {
                    select:{
                        id: true,
                        status: true,
                        data: true, //data da primeira parcela
                        valor_recebido: true,
                        troco: true,
                        forma_pagamento: true,
                        plataforma_pagamento: true,
                        obs: true,
                    },
                },
                order: true,
            },
        });

        if(!crediario){
            throw new Error('Crediário não existe');
        }

        return crediario;
    }
}

export { DetailCrediarioService }