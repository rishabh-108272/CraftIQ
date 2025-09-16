import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import cloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app=express()

cloudinary
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(requireAuth())

app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)

app.get('/', (req,res)=>res.send('Server is live'))
const PORT = process.env.PORT || 3000