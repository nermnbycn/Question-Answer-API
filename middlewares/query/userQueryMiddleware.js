const asyncErrorWrapper=require("express-async-handler");

const {searchHelper,paginationHelper}=require("./queryMiddlewareHelpers");
const userQueryMiddleware=function(model,options){
    return asyncErrorWrapper(async function(req,res,next){
        let query=model.find();

        query=searchHelper("name",query,req);
        const total=await model.countDocuments();

        const {query:paginationQuery,pagination:pagination}=await paginationHelper(total,query,req);

        const queryResults=await paginationQuery;

        res.queryResults={
            success:true,
            count:queryResults.length,
            pagination:pagination,
            data:queryResults
        }

        next();
    });
};

module.exports=userQueryMiddleware;