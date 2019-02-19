import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import { User } from '../models/user'

export const userRules = {
    forRegister: [
        check('username')
            .isEmail()
            .withMessage('Invalid username format')
            .custom(username => User.find({ where: { username } }).then(u => !!!u))
            .withMessage('Username exists'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('Invalid password'),
        check('confirmPassword')
            .custom((confirmPassword, { req }) => {
                return req.body.password === confirmPassword
            })
            .withMessage('Passwords are different'),
    ],
    forLogin: [
        check('username')
            .isEmail()
            .withMessage('Invalid username format')
            .custom(username => User.findOne({ where: { username } }).then(u => !!u))
            .withMessage('Invalid username or password'),
        check('password')
            .custom((password, { req }) => {
                return User.findOne({ where: { username: req.body.username } }).then(u =>
                    bcrypt.compare(password, u!.password),
                )
            })
            .withMessage('Invalid username or password'),
    ],
}
