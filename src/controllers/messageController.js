import { catchAsyncErrors } from "../middleware/errorHandler";
import ErrorHandler from "../middleware/error";
import { Message } from "../models/Message";

export const sendMessage = catchAsyncErrors(async(req, res, next)=>{
    const {senderName, subject, message} = req.body;
    if(!senderName || !subject ||!message){
        return next (new ErrorHandler("Please fill full form", 400));
    }
    const data = await Message.create({senderName, subject, message});
    res.status(200).json({
        success: true,
        message : "Message sent",
        data
    })
})