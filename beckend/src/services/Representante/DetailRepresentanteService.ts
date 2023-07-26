import prismaClient from "../../prisma";

interface RepresentanteRequest{
    representante_id: string;
}

class DetailRepresentanteService{
    async execute({ representante_id }: RepresentanteRequest){

        const representante = await prismaClient.usuario.findMany({
            where: {
                //id: representante_id
                representante: {
                    some: {
                        id: representante_id,
                    }
                }
            },
            include: {
                representante: true,
                endereco: true
            }
        });

        if(!representante[0].representante[0]){
            throw new Error('ID do representante inválido');
        }

        return representante;
    }
}

export { DetailRepresentanteService }