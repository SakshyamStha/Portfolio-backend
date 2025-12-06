import { catchAsyncErrors } from "../middleware/errorHandler.js";
import ErrorHandler from "../middleware/error.js";
import { Message } from "../models/Message.js";

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

export const getAllMessages = catchAsyncErrors(async(req,res,next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    })
})