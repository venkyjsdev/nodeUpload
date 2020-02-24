const cluster = require('cluster')

if (cluster.isMaster) {
    let numWorkers = require('os').cpus().length
    console.log(`Master cluster setting up ${numWorkers} workers...`)

    for (let i = 0; i < numWorkers; i++)  cluster.fork()

    cluster.on('online', (worker) => console.log(`Worker ${worker.process.pid} is online`))

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`)
        console.log('Starting a new worker')
        cluster.fork()
    })
} else {

   require('./app')
}