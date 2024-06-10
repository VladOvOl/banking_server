export class CreateTransactionDto {
    id:number;
    value: number;
    userSenderCardMonth: number;
    userSenderCardYear : number;
    userSenderCardCVC : string;
    userSenderCardNumber: string;
    userRecipientCardNumber: string;
    typeTransaction: string;  
     
}

export class CreatePaymentDto {
    id:number;
    value: number;
    userSenderCardMonth: number;
    userSenderCardYear : number;
    userSenderCardCVC : string;
    userSenderCardNumber: string;
    userRecipientCardNumber: string;
    userRecipientCardName: string;
    typeTransaction: string;  
     
}

export class GetAllByCardDto{
    cardId:string
}
