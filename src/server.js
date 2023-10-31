import app from "./app.js";
import { authenticate, syncUp } from "./config/database/database.js";
import { relations } from "./config/database/relations.js";
import { envs } from "./config/enviroments/enviroments.js";


async function main (){
    try {
        await authenticate()
        relations()
        await syncUp()
    } catch (error) {
        console.error(error)
    }
}

main()

app.listen(envs.PORT, ()=>{
    console.log(`servidor corriente en el puerto ${envs.PORT}`)
})