
import userModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        const token = await jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECURE, { expiresIn: "1h" })

        res.status(201).json({
            msg: "Signup Success", newUser, token
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}



export const logindata = async (req, res) => {


    const { email, password } = req.body
    try {


        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(404).json({ msg: "Email ID not valid please create account" })
            return
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        if (!checkpassword) {
            res.status(404).json({ msg: "password wrong" })
            return
        }

        const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECURE, { expiresIn: "1h" })
        console.log(token)
        if (!token) {

            return res.status(404).json({ msg: "Problem With JWt" })

        }
        res.status(200).json({ msg: "successfully login", token })


    } catch (error) {

        console.log("some  error", error)
        res.status(500).json({ msg: "something error", error })
    }

}


export const getDashboard = async (req, res) => {
    try {
        console.log(req)
    } catch (err) {
        console.log("some err", err)
    }
}










