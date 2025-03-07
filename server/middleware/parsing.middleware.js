const asyncHandler = require("../utils/asyncHandler");

const parseArrayFields = (fieldsToParse)=>{
    return asyncHandler((req , res , next)=>{
        for(const field of fieldsToParse){
            if(req.body[field] && typeof req.body[field] === "string"){
                req.body[field] = JSON.parse(req.body[field]);
            }
        }
        return next();
    })
}
module.exports = parseArrayFields;