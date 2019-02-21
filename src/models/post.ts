import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { User } from './user'

export interface PostAddModel {
    author_id: number
    title: string
    body: string
}

export interface PostLimitModel {
    limit: number
}

export interface PostModel extends Sequelize.Model<PostModel, PostAddModel> {
    id: number
    author_id: number
    title: string
    body: string
    createdAt: string
    updatedAt: string
}

export interface PostViewModel {
    id: number
    title: string
    body: string
    createdAt: string
    author_id: number
}

export const Post = sequelize.define<PostModel, PostAddModel>('posts', {
    author_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    title: Sequelize.STRING,
    body: Sequelize.STRING,
})

Post.belongsTo(User, {
    as: 'author',
    onDelete: 'CASCADE',
    foreignKey: { name: 'author_id', allowNull: false },
})
