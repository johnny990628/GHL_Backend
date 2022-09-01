require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { USER } = require('../models/user')

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken || (req.headers['authorization'] ? req.headers['authorization'].split(' ').pop() : null)

    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_SECRECT_KEY, (err, token) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' })
            } else {
                req.token = token
                return next()
            }
        })
    } else {
        return res.status(403).json({ message: 'Need a token' })
    }
}

router.route('/login').post(async (req, res) => {
    /* 	
        #swagger.tags = ['Auth']
        #swagger.description = '登入' 
    */
    try {
        const { username, password } = req.body
        const user = await USER.findOne({ username })
        if (!user) return res.status(401).json({ message: '查無使用者' })

        if (await bcrypt.compare(password, user.password)) {
            if (user.role === 0) return res.status(403).json({ message: '使用者權限不足，等待管理員審核' })
            const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRECT_KEY, {
                expiresIn: 6000000,
            })
            user.password = null
            return res
                .cookie('accessToken', accessToken, {
                    maxAge: 6000000,
                    // maxAge: 6000,
                    secure: false, //set true if using https
                    httpOnly: true, //can't access from javascript
                    sameSite: true,
                })
                .status(200)
                .json({ message: 'login successful', user, token: accessToken })
        } else {
            return res.status(401).json({ message: '密碼錯誤' })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.route('/logout').post((req, res, next) => {
    /* 	
        #swagger.tags = ['Auth']
        #swagger.description = '登出' 
    */
    return res.clearCookie('accessToken').status(200).json({ message: 'logout successful' })
})

router.route('/register').post(async (req, res) => {
    /* 	
        #swagger.tags = ['Auth']
        #swagger.description = '註冊' 
    */
    try {
        let user = new USER({ ...req.body, password: await bcrypt.hash(req.body.password, 10), role: 0 })
        user = await user.save()
        user.password = null
        return res.status(200).json(user)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.route('/verify').post(async (req, res) => {
    /* 	
        #swagger.tags = ['Auth']
        #swagger.description = '驗證' 
    */
    try {
        const accessToken = req.cookies.accessToken || (req.headers['authorization'] ? req.headers['authorization'].split(' ').pop() : null)

        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_SECRECT_KEY, async (err, token) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' })
                } else {
                    const user = await USER.findOne({ _id: token.id }).select({ password: 0 })
                    return res.status(200).json({ message: 'Valid token', user, token: accessToken })
                }
            })
        } else {
            return res.status(403).json({ message: 'Need a token' })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
})

module.exports = { router, verifyToken }
