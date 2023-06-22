import prismaClient from "../../prisma";

interface FabricaRequest{
    ie: string;
    contato: string
    representante_id: string;
    empresa: string;
    cnpj: string;
    razaosocial: string;
}

class CreateFabricaSevice{
    async execute({ empresa, cnpj, ie, razaosocial, contato, representante_id }: FabricaRequest){

        // Verificando se tem um CNPJ
        if(cnpj.length !== 18){
            throw new Error("Informe um CNPJ valido");
        }

        const fabricaAllReadyExists = await prismaClient.fabrica.findFirst({
            where: {
                cnpj: cnpj
            }
        });
        if(fabricaAllReadyExists){
            throw new Error("Esse CNPJ já existe em nosso Banco de dados!")
        }

        const fabrica = await prismaClient.fabrica.create({
            data:{
                empresa: empresa,
                cnpj: cnpj,
                ie: ie,
                razaosocial: razaosocial,
                contato: contato,
                representante_id: representante_id,
            },
        });
        
        return fabrica;
    }
}

export { CreateFabricaSevice }