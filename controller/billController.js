const mongoose = require("mongoose")
const Bill=require("./../model/bill")
const HttpError = require("../error/error");
const { validationResult } = require("express-validator")
const createBill = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const createBill = {
        name: req.body.name,
        phone:req.body.phone,
        number:req.body.number,
        address:req.body.address,
        note:req.body.note,
        product:req.body.product
    };
    try {
        const newBills = new Bill(createBill);
        await newBills.save();
        res.status(200).json({
            message: "Create success", newBills
        });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            // Duplicate username
            return res.status(422).send({ message: 'Bills already exist!' });
        }
        return res.status(422).send(error);
    };

};
const getAllBill = async (req, res, next) => {
    let bills;
    try {
        bills = await Bill.find();
        console.log(bills);
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, coud not find any order",
            500
        );
        return next(error);
    }

    if (!bills) {
        const error = new HttpError("Could not find any order", 404);
        return next(error);
    }
    res.status(200).json({ bills });
};
const deleteBill=async(req,res,next)=>{
    // const BilId = req.params.bid;
    let bills;
    try {
        bills = await Bill.deleteMany();
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if (!bills) {
        const error = new HttpError('Could not find any Category', 404);
        return next(error);
    }
    res.status(200).json({ message: 'Deleted Bill successfull' });
}
const updatedBill = async(req,res,next)=>{
    const errors = validationResult(req);
    const bid = req.params.bid;
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const updatedBill = {
       checked:req.body.checked
    };
    let bills;
    bills = await Bill.findByIdAndUpdate(bid, updatedBill);
    res.status(200).json({ bills:updatedBill });
}
module.exports = { createBill, getAllBill, deleteBill,updatedBill};
