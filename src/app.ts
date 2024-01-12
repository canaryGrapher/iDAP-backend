// server.js
import express, { NextFunction, Request, Response, Router } from 'express'
import dbConnect from './models/db'

import JourneyRouter from "./routes/journeys"
import OverlayRouter from "./routes/overlays"

const app = express()
const router = Router()
app.use(express.json());
app.use(router)

const port = process.env.PORT || 3003

// router.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(`Request made at: ${Date.now().toString()}`)
//   next()
// })

router.use("/journeys", JourneyRouter)
router.use("/overlays", OverlayRouter)

app.get('/', (req: Request, res: Response) => {
  console.log("Reached here now")
  res.json({ status: 200, msg: "Status OK" })
})

app.listen(port, () => {
  dbConnect()
  console.log(`Server is running on port ${port}`)
})
