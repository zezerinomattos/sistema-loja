import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../../../services/errors/AuthTokenError';

// Funcao para paginas que só usuarios logados podem ter acesso.
export function canSSRAuth<P extends { [key: string]: any } >(fn: GetServerSideProps<P>){
    return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult <P> > => {
        const cookies = parseCookies(ctx);

        const token = cookies['@sistemaunited'];

        if(!token){
            return {
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx);
        
        }catch(err){
            //se deu algum erro eu destruo o cookie e mando de volta para a tela de login
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@sistemaunited');

                return{
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

        return await fn(ctx);

    }
}
