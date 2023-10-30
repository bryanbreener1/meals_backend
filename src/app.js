import Express  from "express";
import { router } from "./routes/routes.js";


const app = Express()
app.use(Express.json())

app.use('/api/v1', router)

export default app