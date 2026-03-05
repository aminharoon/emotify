const Redis = require("ioredis").default

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

try {
    redis.on("connect", () => {
        console.log("server is connected to the redis ")
    })
} catch (e) {
    console.error("something went wrong while connecting redis ", e.message)

}

module.exports = redis