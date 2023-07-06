import prismaClient from "../../prisma";

interface CrediarioRequest{
    data_inicial: Date;
    data_final: Date;
    cliente_id?: string;
}

class ListCrediarioDateService{
    async execute({ data_inicial, data_final, cliente_id}: CrediarioRequest){

        if(cliente_id){
            const crediario = await prismaClient.crediario.findMany({
                where:{
                    cliente_id: cliente_id,
                    created_at:{
                        gte: data_inicial,
                        lte: data_final,
                    }
                },
                orderBy:{
                    created_at: 'desc'
                },
            });
    
            if(!crediario){
                throw new Error('Informe os dados corretamente');
            }
    
            let valorCrediarioAtualizado = crediario[0].valorTotal;
    
            const valorTotal = crediario.map((valor) => {
                let valorCrediario = valor.valorTotal;
    
                valorCrediarioAtualizado += valorCrediario;
            })
    
            return {crediario, valorCrediarioAtualizado}
        }else{
            const crediario = await prismaClient.crediario.findMany({
                where:{
                    created_at:{
                        gte: data_inicial,
                        lte: data_final,
                    }
                },
                orderBy:{
                    created_at: 'desc'
                },
            });
    
            if(!crediario){
                throw new Error('Informe os dados corretamente');
            }
    
            let valorCrediarioAtualizado = crediario[0].valorTotal;
    
            const valorTotal = crediario.map((valor) => {
                let valorCrediario = valor.valorTotal;
    
                valorCrediarioAtualizado += valorCrediario;
            })
    
            return {crediario, valorCrediarioAtualizado}
        }
    }
}

export { ListCrediarioDateService }