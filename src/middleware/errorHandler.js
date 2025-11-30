export const catchAsyncErrors = (calledFunction) => {
    return (req, res, next) =>{
        Promise.resolve(calledFunction(req,res,next)).catch(next);
    }
}