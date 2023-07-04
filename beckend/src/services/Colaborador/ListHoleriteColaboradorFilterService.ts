import prismaClient from "../../prisma";

interface HoleriteRequest{
    colaborador_id?: string;
    colaborador_name?: string;
}

class ListHoleriteColaboradorFilterService{
    async execute({ colaborador_name, colaborador_id }: HoleriteRequest){
        if(colaborador_id){
            const holerite = await prismaClient.holerite.findMany({
                where: {
                    colaboradorId: colaborador_id,
                },
                orderBy:{
                    created_at: 'desc',
                },
            });

            return holerite;
        }

        if(colaborador_name){
            const holerite = await prismaClient.holerite.findMany({
                where: {
                    colaborador_nome: {
                        contains: colaborador_name,
                    },
                },
                orderBy:{
                    created_at: 'desc',
                },
            });

            return holerite;
        }

        if(!colaborador_id || !colaborador_name){
            throw new Error('Informe um ID ou o nome de colaborador');
        }
    }
}

export { ListHoleriteColaboradorFilterService }