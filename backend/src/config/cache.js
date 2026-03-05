const Redis = require("ioredis").default

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})


redis.on("connect", () => {
    console.log("server is connected to the redis ")
})
redis.on("error", () => {
    console.error("something went wrong while connecting to the redis ", error.message)
})



module.exports = redis