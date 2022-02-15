import { errorHandler } from '../utils/errorHandler'
import { User } from "../shared/mongodb/model/User";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const register = async (req, res) => {

        try {
            const {email, password, name} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(404).json({
                    success: false,
                    message: 'Email уже существует'
                })
            } else {
                const salt = bcrypt.genSaltSync(10);
                await User.create({
                    email,
                    name,
                    password: bcrypt.hashSync(password, salt)
                })
                res.status(200).json({
                    success: true
                })
            }
        }   catch (e) {
            errorHandler(res, e)
        }
    }

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate)  {
            const passwordResult = bcrypt.compareSync(password, candidate.password)
            if (passwordResult) {
                res.status(200).json({
                    token: jwt.sign({
                        email:candidate.email,
                        userId: candidate._id
                    }, process.env.JWT_TOKEN, {expiresIn: 60 * 60}),
                        success: true
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Incorrect password. Try it again'
                })
            }
        } else {
            res.status(404).json({
                message: "user not found",
                success: false
            })
        }

    } catch (e) {
        errorHandler(res, e)
    }
}


const main = async (req, res) => {
    try {
        const arr = await User.find({})
        return res.status(200).json({success:true, users:arr})
    } catch (e) {
        errorHandler(res, e)
    }
}


const products = async (req, res) => {
    try {
        const arr = await User.find({})
        return res.status(200).json({success:true, users:arr})
    } catch (e) {
        errorHandler(res, e)
    }
}

export {login, register, products, main}

