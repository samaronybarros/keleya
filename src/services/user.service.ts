require('dotenv').load()

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'bluebird'
import { User, UserAddModel, UserViewModel } from '../models/user'

const config = require('../config')
export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = config.secret //MD5(Keleya)

    static get userAttributes() {
        return ['id', 'username']
    }
    private static _user
    static get user() {
        return UserService._user
    }

    register({ username, password }: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds).then(hash => {
            return User.create({ username, password: hash }).then(u => {
                return this.getUserById(u!.id)
            })
        })
    }

    createToken(id: number, username: string) {
        return jwt.sign({ id, username }, this._jwtSecret)
    }

    login({ username }: UserAddModel) {
        return User.findOne({ where: { username } }).then(u => {
            const { id, username } = u!
            return { token: this.createToken(id, username) }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false)
                    return
                }

                UserService._user = User.findById(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getUserById(id: number) {
        return User.findById(id, {
            attributes: UserService.userAttributes,
        }).then(u => {
            const { id, username } = u!
            return { id, username, token: this.createToken(id, username) }
        })
    }
}
