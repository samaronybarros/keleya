import { Router } from 'express'
import { matchedData } from 'express-validator/filter'
import { validationResult } from 'express-validator/check'
import { postRules } from '../rules/post.rules'
import { PostService } from '../services/post.service'
import { PostAddModel, PostLimitModel } from '../models/post'
import { UserService } from '../services/user.service'

export const postRouter = Router()
const postService = new PostService()

postRouter.post('/posts', postRules['forRegisterPost'], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json(errors.array())

    const token = req.headers['x-token']
    if (!token) return res.status(406).json({ message: 'Not acceptable' })

    const userService = new UserService()
    const hasAccess = userService.verifyToken(token)
    hasAccess.then(a => {
        if (!a) return res.status(401).json({ message: 'Unauthorized' })
    })

    const payload = matchedData(req) as PostAddModel
    const post = postService.register(payload)

    return post.then(p => res.json(p))
})

postRouter.get('/posts/:id', (req, res) => {
    const paramId = req.params.id

    if (isNaN(paramId) || !Number.isInteger(+paramId)) {
        return res.status(422).json({ error: 'Post Id should be a integer number' })
    }

    const post = postService.getPostById(paramId)

    return post.then(p => {
        return p
            ? res.json(p)
            : res.status(404).json({ error: `Post with Id ${paramId} not found` })
    })
})

postRouter.get('/posts', postRules['forSelectPosts'], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json(errors.array())

    const payload = matchedData(req) as PostLimitModel
    const post = postService.getPosts(payload)

    return post.then(p => {
        return p ? res.json(p) : res.status(404).json({ error: `Empty posts` })
    })
})
