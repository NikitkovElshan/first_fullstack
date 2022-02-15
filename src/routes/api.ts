import * as express from 'express';
import {login, products, register, main} from "../controllers/api";
import {User} from "../shared/mongodb/model/User";
import * as jwt from 'jsonwebtoken';

const tokenCheck = function (req, res, next) {
    const jwtHeader = req.headers.authorization
    if(jwtHeader){
        jwt.verify(jwtHeader, process.env.JWT_TOKEN, async (err, decoded)=> {
            if (err) {
                return res.status(401).json({success:false})
            }
            else {
                const candidate = await User.findById(decoded.userId)
                if(candidate){
                    next();
                } else {
                    return res.status(401).json({success:false})
                }
            }
        });
    } else {
        return res.status(401).json({success:false})
    }
};

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', register)


router.post('/main', main, tokenCheck)
router.get('/products', tokenCheck, products)

export {router}

