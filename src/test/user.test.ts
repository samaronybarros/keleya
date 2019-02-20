require('dotenv').load()

import test from 'ava'
import axios, { AxiosInstance } from 'axios'

const config = require('../config')
const client: AxiosInstance = axios.create({
    baseURL: config.apiServer,
})

test('Should register a user with username and valid password', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result = await client.post('/users', payload)

    t.is(result.status, 200)
})

test('Should not register a user if username is not valid', async t => {
    const payload = {
        username: `error.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result = await t.throwsAsync(async () => client.post('/users', payload))

    t.is(result.name, 'Error')
})

test('Should not register a user if username does not exist', async t => {
    const payload = {
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result = await t.throwsAsync(async () => client.post('/users', payload))

    t.is(result.name, 'Error')
})

test('Should not register a user if password is different by confirm password', async t => {
    const payload = {
        username: `error.com`,
        password: 'test1234',
        confirmPassword: '4321tset',
    }

    const result = await t.throwsAsync(async () => client.post('/users', payload))

    t.is(result.name, 'Error')
})

test('Should not register the same user twice', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result1 = await client.post('/users', payload)
    const result2 = await t.throwsAsync(async () => client.post('/users', payload))

    t.is(result1.status, 200)
    t.is(result2.name, 'Error')
})

test('Should not register a user that exists', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const result1 = await client.post('/users', payload)
    const result2 = await t.throwsAsync(async () => client.post('/users', payload))

    t.is(result1.status, 200)
    t.is(result2.name, 'Error')
})

test('Should authenticate user with username and valid password', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const authPayload = { username: payload.username, password: payload.password }

    const result1 = await client.post('/users', payload)

    const result2 = await client.post('/users/auth', authPayload)

    t.is(result1.status, 200)
    t.is(result2.status, 200)
})

test('Should not authenticate user with wrong username and valid password', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const stringError = 'randomEmail'

    const authPayload = { username: payload.username + stringError, password: payload.password }

    const result1 = await client.post('/users', payload)

    const result2 = await t.throwsAsync(client.post('/users/auth', authPayload))

    t.is(result1.status, 200)
    t.is(result2.name, 'Error')
})

test('Should not authenticate user with valid username and wrong password', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const stringError = 'randomEmail'

    const authPayload = { username: payload.username, password: payload.password + stringError }

    const result1 = await client.post('/users', payload)

    const result2 = await t.throwsAsync(client.post('/users/auth', authPayload))

    t.is(result1.status, 200)
    t.is(result2.name, 'Error')
})

test('Should not authenticate user with wrong username and password', async t => {
    const randomEmail = Math.random()
        .toString(36)
        .substring(7)

    const payload = {
        username: `${randomEmail}@spambog.com`,
        password: 'test1234',
        confirmPassword: 'test1234',
    }

    const stringError = 'randomEmail'

    const authPayload = {
        username: payload.username + stringError,
        password: payload.password + stringError,
    }

    const result1 = await client.post('/users', payload)

    const result2 = await t.throwsAsync(client.post('/users/auth', authPayload))

    t.is(result1.status, 200)
    t.is(result2.name, 'Error')
})
