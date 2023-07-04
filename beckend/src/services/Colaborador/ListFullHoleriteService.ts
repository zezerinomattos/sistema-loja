import prismaClient from "../../prisma";

class ListFullHoleriteService{
    async execute(){
        const holerite = await prismaClient.holerite.findMany({
            orderBy:{
                created_at: 'desc',
            },
        });

        return holerite;
    }
}

export { ListFullHoleriteService }