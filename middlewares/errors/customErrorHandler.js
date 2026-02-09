const CustomError=require ("../../helpers/error/CustomError"); //olusturdugumuz sinifi burada kullaniyoruz sayfaya dahil ediyoruz

const customErrorHandler=(err,req,res,next)=>{

    let customError=err;
    
    if(err.name==="SyntaxError"){ //sadece SyntaxError sinifini kullansaydik statu degeri gelmeyecekti  o yuzden kendimiz olusturduk
        customError=new CustomError("Unexpected Syntax",400);
    }
    if(err.name==="ValidationError"){
        customError=new CustomError(err.message,400);
    }
    if(err.name==="CastError"){ //id formatina uygun olmayan yapi geldigi zaman bu hata firlatilir
        customError=new CustomError("Please provide a valid id");
    }
    if(err.code===11000){
        customError=new CustomError("Please check your input",400);
    }
   
     const statusCode = customError.status || 500; //bazi hata degerlerinde statu degeri undefined olarak geliyor o yuzden bu satiri yazdik
    res
    .status(statusCode)
    .json({
        success: false,
        message:customError.message  || "Internal Server Error"
    });
};

module.exports=customErrorHandler;