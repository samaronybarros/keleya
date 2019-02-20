require('dotenv').load()

import test from 'ava'
import axios, { AxiosInstance } from 'axios'
import { PostLimitModel } from '../models/post'

const config = require('../config')
const client: AxiosInstance = axios.create({
    baseURL: config.apiServer,
})

test('Should get all posts (limit 10)', async t => {
    const result = await client.get('/posts')

    t.is(result.status, 200)
    t.is(result.data.length, 10)
})

test('Should get the post id 1', async t => {
    const id = 1
    const result = await client.get(`/posts/${id}`)

    t.is(result.status, 200)
    t.is(result.data.id, 1)
})

test('Should not get the post id 9999', async t => {
    const id = 9999
    const result = await t.throwsAsync(client.get(`/posts/${id}`))

    t.is(result.name, 'Error')
})

test('Should post new value', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result1 = await client.post('/users', payload)

    const postPayload = {
        title: 'AVA test',
        body:
            "AVA comes bundled with a TypeScript definition file. This allows developers to leverage TypeScript for writing tests. This guide assumes you've already set up TypeScript for your project. Note that AVA's definition has been tested with version 3.2.4.",
        author_id: result1.data.id,
    }

    const result2 = await client.post('/posts', postPayload, {
        headers: { 'x-token': result1.data.token },
    })

    t.is(result1.status, 200)
    t.is(result2.status, 200)
})

test('Should not post without token', async t => {
    const postPayload = {
        title: 'AVA test',
        body:
            "AVA comes bundled with a TypeScript definition file. This allows developers to leverage TypeScript for writing tests. This guide assumes you've already set up TypeScript for your project. Note that AVA's definition has been tested with version 3.2.4.",
        author_id: 1,
    }

    const result = await t.throwsAsync(client.post('/posts', postPayload))

    t.is(result.name, 'Error')
})

test('Should not post with wrong token', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result1 = await client.post('/users', payload)

    const postPayload = {
        title: 'AVA test',
        body:
            "AVA comes bundled with a TypeScript definition file. This allows developers to leverage TypeScript for writing tests. This guide assumes you've already set up TypeScript for your project. Note that AVA's definition has been tested with version 3.2.4.",
        author_id: result1.data.id,
    }

    const result2 = await t.throwsAsync(
        client.post('/posts', postPayload, {
            headers: { 'x-token': result1.data.token.substring(10) },
        }),
    )

    t.is(result1.status, 200)
    t.is(result2.name, 'Error')
})

test('Should not post with wrong author', async t => {
    const postPayload = {
        title: 'AVA test',
        body:
            "AVA comes bundled with a TypeScript definition file. This allows developers to leverage TypeScript for writing tests. This guide assumes you've already set up TypeScript for your project. Note that AVA's definition has been tested with version 3.2.4.",
        author_id: 9999,
    }

    const result = await t.throwsAsync(client.post('/posts', postPayload))

    t.is(result.name, 'Error')
})
