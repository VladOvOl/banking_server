export class CreateTransactionDto {
    id:number;
    value: number;
    userSenderCardMonth: number;
    userSenderCardYear : number;
    userSenderCardCVC : string;
    userSenderCardNumber: string;
    userRecipientCardNumber: string   
     
}

export class GetAllByCardDto{
    cardId:string
}
