import Admin from "../model/admin.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const signin = async (request, response, next) => {
    try {
        let admin = await Admin.findOne({ email: request.body.email });
        let status = admin ? await bcrypt.compare(request.body.password, admin.password) : false;
        return status ? response.status(200).json({ message: 'Signin Success', status: true, admin: { ...admin.toObject(), password: undefined } }) :
            response.status(401).json({ message: 'Unauthorized admin', status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signup = async (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", status: false, errors: errors.array() });
        const saltKey = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, saltKey);

        let admin = await Admin.create(request.body);
        return response.status(200).json({ message: "Signup Success", admin: admin, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signout = async (request, response, next) => {

}