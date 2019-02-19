import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'bluebird'
import { User, UserAddModel, UserViewModel } from '../models/user'

export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = 'd8e87a4c063de26f71d64116b996cee5' //MD5(Keleya)

    static get userAttributes() {
        return ['id', 'username']
    }
    private static _user
    static get user() {
        return UserService._user
    }

    register({ username, password }: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds).then(hash => {
            return User.create({ username, password: hash }).then(u => this.getUserById(u!.id))
        })
    }

    login({ username }: UserAddModel) {
        return User.findOne({ where: { username } }).then(u => {
            const { id, username } = u!
            return { token: jwt.sign({ id, username }, this._jwtSecret) }
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
        }) as Bluebird<UserViewModel>
    }
}
