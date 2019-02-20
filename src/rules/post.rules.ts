import { check } from 'express-validator/check'

export const postRules = {
    forRegisterPost: [
        check('title')
            .not()
            .isEmpty()
            .withMessage('Title invalid'),
        check('body')
            .not()
            .isEmpty()
            .withMessage('Body invalid'),
        check('author_id')
            .isNumeric()
            .withMessage('Author ID invalid'),
    ],
    forSelectPosts: [
        check('limit')
            .optional()
            .isInt()
            .custom(limit => typeof limit === 'number')
            .withMessage('Limit invalid'),
    ],
}
