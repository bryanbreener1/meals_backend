import Express  from "express";
import { router } from "./routes/routes.js";
import { globalErrorHandler } from "./errors/error.controller.js";
import { enableMorgan } from "./config/plugins/morgan.plugin.js";
import { envs } from "./config/enviroments/enviroments.js";
import { AppError } from "./errors/appError.js";


const app = Express()
app.use(Express.json())


if(envs.NODE_ENV === 'development'){
    enableMorgan(app)
}

app.use('/api/v1', router)

app.all('*', (req, res, next) => {

    next(new AppError(`the route ${req.originalUrl} does not exist in the server`, 404))
})


app.use(globalErrorHandler)

export default app