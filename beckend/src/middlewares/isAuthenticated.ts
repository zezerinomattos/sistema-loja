import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    //Recebendo o token
    const authToken = req.headers.authorization;

    //Verificando se tem um token, se nao tiver vai ser barrado
    if(!authToken){
        return res.status(401).end();
    }
    
    const [, token] = authToken.split(" ");

    try {
        //Validando token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        req.user_id = sub;

        return next();

    } catch (error) {
        return res.status(401).end();
    }

    //return next();
}