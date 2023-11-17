const db = require('../db/models')
const Validator = require('fastest-validator')
const { google } = require('googleapis')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
// const AuthService = require('../services/AuthService')

dotenv.config()

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5000/auth/google/callback'
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
})

const v = new Validator();

exports.loginUser = (req, res) => {
    res.redirect(authorizationUrl)
}

exports.authorizationUser = async (req, res) => {
    const { role } = req.body
    const {code} = req.query
    const {tokens} = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    })

    const {data}= await oauth2.userinfo.get()

    if(!data.email) {
        return res.json({
            data: data,
        })
    }

    let oneuser = await db.user.findOne({ where: {
        email: data.email
    }})

    if(!oneuser) {
        oneuser = await db.user.create({
            name: data.name,
            email: data.email,
            role: "1"
        })
    }

    // const theuser = db.user.findOne({ where: {email: req.body.email}})

    const payload = {
        id: oneuser.id,
        name: oneuser.name,
        role: oneuser.role
    }
    const secret = process.env.JWT_SECRET
    const expiresIn = 60 * 60 * 1;
    const token = jwt.sign(payload, secret, {expiresIn: expiresIn})

    // return res.redirect(`http://localhost:5000/auth-success?token=${token}`)

    return res.json({
        data: {
            id: oneuser.id,
            name: oneuser.name,
            role: oneuser.role
        },
        token: token
    })
}

exports.createUser = async(req, res) => {
    const schema = {
        name: { type: 'string', min: 5, max: 50, optional: false },
        phone: { type: 'string', min: 9, max: 20, optional: false },
        email: { type: 'email', optional: false },
        password: { type: 'string', min: 5, max: 20, optional: false }
    }

    try {
        await db.user.findOne({ where: { email: req.body.email }}).then(user => {
            if(user){
                res.status(400).json({ message: 'Email already exist' });
            } else {
                const validationResult = v.validate(req.body, schema);
    
                if (validationResult !== true) {
                    res.status(400).json({
                        message: 'Validation failed',
                        data: validationResult
                    })
                } else {
                    db.user.create(req.body).then(result => {
                        res.status(200).json({
                            message: 'User created!',
                            data: result
                        });
                    }).catch(err => {
                        res.status(400).json({
                            message: 'Register failed',
                            data: err
                        });
                    });
                }
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllUsers = async(req, res) => {
    try {
        const response = await db.user.findAll()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

exports.getOneUser = async(req, res) => {
    try {
        const response = await db.user.findOne({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateUser = async(req, res) => {
    const schema = {
        name: { type: 'string', min: 5, max: 50, optional: false },
        phone: { type: 'string', min: 9, max: 20, optional: false },
        email: { type: 'email', optional: false },
        password: { type: 'string', min: 5, max: 20, optional: false }
    }

    const validationResult = v.validate(req.body, schema);

    if (validationResult !== true) {
        res.status(400).json({
            message: 'Validation failed',
            data: validationResult
        })
    } else {
        await db.user.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).json({
                message: 'User updated',
                data: result
            })
        }).catch(err => {
            res.status(400).json({
                message: 'Update failed',
                data: err
            })
        })
    }
}

exports.deleteUser = async(req, res) => {
    try {
        await db.user.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({msg: "user deleted!"})
    } catch (error) {
        console.log(error.message);
    }
}