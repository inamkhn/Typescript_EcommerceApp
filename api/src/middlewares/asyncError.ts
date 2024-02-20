// import { NextFunction } from "express"
// interface Errortype{
//     next:NextFunction
// }
// type controllerType ={
//     req:Request
//     res:Response
//     next:NextFunction
// }
// export const asyncError = (passfunction) => (req:Request,res:Response,next:NextFunction)=>{
//     Promise.resolve(passfunction(req,res,next)).catch(next)
// }