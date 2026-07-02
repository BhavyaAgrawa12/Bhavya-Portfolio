import app from "./app.js";
import {env} from "./config/env.js";
import prisma from "./lib/prisma.js";

async function main(){
    try{
        await prisma.$connect();
        console.log("Database connected successfully");

        app.listen(env.PORT, () =>{
            console.log(`Server is running on port ${env.PORT}`);
        });
    }catch(error){
        console.error("Error connnecting to database");
        console.error(error);
    }
};

main();