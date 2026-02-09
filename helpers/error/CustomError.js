class CustomError extends Error{ //Sadece Error clasini kullanacak olsaydik status degeri kullanilmayacakti
    constructor(message,status){ //CustomE  error clasinda status degeri verilmelidir
        super(message);
        this.status=status;
    }
}
module.exports=CustomError;