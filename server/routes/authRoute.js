

import express from "express"
import { signup,logindata} from "../controllers/authController.js"
import {checktoken} from "../middleware/validation.js"

const route = express.Router()

route.post("/signup", signup)
route.post("/login",logindata)
// route.get("/dashboard",checktoken,getDashboard)

export default route






// http://localhost:5000/api/auth/signup

// http://localhost:5000/api/auth/login









