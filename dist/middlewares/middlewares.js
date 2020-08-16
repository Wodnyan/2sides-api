"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDateFormating = void 0;
exports.checkDateFormating = (req, res, next) => {
    const { date } = req.params;
    const dateFormatRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    if (dateFormatRegex.test(date) && !isNaN(Date.parse(date))) {
        next();
    }
    else {
        return res.status(400).json({
            message: "There was something wrong with the date you provided, check if date is formated correctly (yyyy-mm-dd)",
        });
    }
};
