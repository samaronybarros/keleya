import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'

export interface UserAddModel {
    username: string
    password: string
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id: number
    username: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface UserViewModel {
    id: number
    username: string
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
})
