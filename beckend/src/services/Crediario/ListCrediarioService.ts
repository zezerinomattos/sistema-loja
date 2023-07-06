import prismaClient from "../../prisma";

class ListCrediarioService{
    async execute(){
        const crediario = await prismaClient.crediario.findMany({
            orderBy:{
                cliente:{
                    usuario:{
                        nome: 'asc',
                    },
                },
            },
        });

        let valorCrediarioAtualizado = crediario[0].valorTotal;

        const valorTotal = crediario.map((valor) => {
            let valorCrediario = valor.valorTotal;

            valorCrediarioAtualizado += valorCrediario;
        })

        return {crediario, valorCrediarioAtualizado}
    }
}

export { ListCrediarioService }