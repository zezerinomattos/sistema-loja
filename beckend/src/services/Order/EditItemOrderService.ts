import prismaClient from "../../prisma";

interface ItemRequest{
    item_id: string;
    qtd: number;
}

class EditItemOrderService{
    // async execute({ item_id, qtd }: ItemRequest){
    //     const item = await prismaClient.item.findFirst({
    //         where: {
    //             id: item_id,
    //         },
    //         include: {
    //             produto:{
    //                 select: {
    //                     id: true,
    //                     produto_cor: {
    //                         select:{
    //                             produto_tamanhos_estoque:{
    //                                 select:{
    //                                     estoque: true,
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });

    //     if(!item_id){
    //         throw new Error("Item não encontrado");
    //     }

    //     if(!item){
    //         throw new Error("Item não encontrado");
    //     }

    //     if(!qtd){
    //         throw new Error("Item não encontrado");
    //     }

    //     if(qtd > (item.produto.produto_cor[0].produto_tamanhos_estoque[0].estoque + item.qtd)){
    //         throw new Error("Estoque insuficiente");
    //     }

    //     const EditItem = await prismaClient.item.update({
    //         where:{
    //             id: item_id,
    //         },
    //         data: {
    //             qtd: qtd,
    //         }
    //     });

    //     return EditItem;

    // }
}

export { EditItemOrderService }