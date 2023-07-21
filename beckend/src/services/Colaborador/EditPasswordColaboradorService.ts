import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface ColaboradorRequest {
    colaborador_id: string;
    email: string;
    senha: string;
}

class EditColaboradorService{
    async execute({ colaborador_id, email, senha }: ColaboradorRequest){

       try {
        
            // Verificar se o colaborador existe
            const existingColaborador = await prismaClient.colaborador.findUnique({
                where: { id: colaborador_id },
                include: { usuario: { include: { endereco: true } } },
            });
        
            if (!existingColaborador) {
                throw new Error('Colaborador not found');
            }

            // Criptografando a senha
            const passwordHash = await hash(senha, 8);


            // Atualizar os dados do colaborador
            const updatedColaborador = await prismaClient.colaborador.update({
                where: { id: colaborador_id },
                data: {
                    colaborador_id,
                    senha: passwordHash,
                },
            });

            // Atualizar os dados do usuário relacionado
            const updatedUsuario = await prismaClient.usuario.update({
                where: { id: existingColaborador.usuario_id },
                data: {
                    email,
                },
            });

            return {updatedColaborador, updatedUsuario};

       } catch (error) {
            throw new Error('ALGO DEU ERRADO VERIFIQUE E TENTE NOVAMENTE!');
            console.log(error);
       }
    }
}

export { EditColaboradorService }