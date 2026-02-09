const asyncErrorWrapper=require("express-async-handler");

const {searchHelper,populateHelper,questionSortHelper,paginationHelper}=require("./queryMiddlewareHelpers");
const questionQueryMiddleware=function(model,options){
    return asyncErrorWrapper(async function(req,res,next){
        let query=model.find();

        query=searchHelper("title",query,req);

        if(options && options.population){
            query=populateHelper(query,options.population);
        };

        query=questionSortHelper(query,req)

        const total=await model.countDocuments(); //question modelindeki tum cevaplari almak icin kullandik
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

module.exports=questionQueryMiddleware;



