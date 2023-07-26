import prismaClient from "../../prisma";

interface RepresentanteRequest{
    representante_id: string,
    nome: string;
    sexo: string;
    email: string;
    foto: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    pais: string;
    empresa: string; 
    celular: string; 
    telefone: string; 
}

class EditRepresentanteService{
    async execute({ representante_id, nome, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, empresa, celular, telefone }: RepresentanteRequest){

        // Verificar se representante existe
        const existingRepresentante = await prismaClient.representante.findUnique({
            where:{id: representante_id},
            include: {usuario: {include: {endereco: true} } },
        });

        if(!existingRepresentante){
            throw new Error('Representante not found');
        }

        //Atualizar os dados do representante
        const updateRepresentante = await prismaClient.representante.update({
            where: { id: representante_id },
            data:{
                empresa: empresa, 
                celular: celular, 
                telefone: telefone, 
                updated_at: new Date(),
            },
        });

        // Atualizar os dados do usuário relacionado
        const updatedUsuario = await prismaClient.usuario.update({
            where: { id: existingRepresentante.usuario_id},
            data: {
                nome,
                sexo,
                email,
                foto: foto !== null ? foto : existingRepresentante.usuario.foto,
            },
        });

        // Atualizar os dados do endereço relacionado
        const updatedEndereco = await prismaClient.endereco.update({
            where: { id: existingRepresentante.usuario.endereco_id },
            data: {
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                uf,
                pais,
            },
        });

        return [updateRepresentante, updatedUsuario, updatedEndereco];
        
    }
}

export { EditRepresentanteService }