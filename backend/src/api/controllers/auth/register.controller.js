import { StatusCodes } from "http-status-codes";

import User from "../../../models/user.model.js";
import hashPassword from "../../../services/hashPassword.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });


        // if the user already exists
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({ status: 'error', msg: 'User already registered' })
        }

        // hashing password
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(StatusCodes.CREATED).json({ status: 'success', msg: 'User created successfully' })




    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}


export default registerUser;