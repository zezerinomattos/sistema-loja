import prismaClient from "../../prisma";

interface HoleriteRequest{
    holerite_id: string;
}

class DetailHoleriteService{
    async execute({ holerite_id }: HoleriteRequest){

        if(!holerite_id){
            throw new Error('Informe um id Valido');
        }

        const holerite = await prismaClient.holerite.findFirst({
            where: {
                id: holerite_id,
            },
        });

        if(!holerite){
            throw new Error('Holerite não encontrado');
        }

        return holerite;
    }
}

export { DetailHoleriteService }