const express=require("express");
const { check } = require("express-validator");
const BillController = require("../controller/billController");
const router=express.Router();
router.get('/',BillController.getAllBill);

router.post('/',
    [
        check('name').not().isEmpty()
    ]
    , BillController.createBill
);
router.delete('/',BillController.deleteBill);

router.put('/:bid',
[
    check('name').not().isEmpty()
]
,BillController.updatedBill);
module.exports=router;