import crypto from 'crypto';
import { request } from 'express';
import multer from 'multer';

// Pegando os caminhos
import { extname, resolve } from 'path';


export default{
    upload(foto: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', foto),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}
