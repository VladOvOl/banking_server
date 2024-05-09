import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { read } from 'fs';

@Injectable()
export class UtilsService{

    constructor(){}

    encrypt(data:string,key:string){  
      const encryptedMessage: string = CryptoJS.AES.encrypt(data, key).toString();
      return encryptedMessage
    }

    decrypt(data:string,key:string){      
      const decryptedMessage: string = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
      return decryptedMessage
    }

    randomGenerator(){
        let length = 20
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        
        return result;
          
    }
    
}