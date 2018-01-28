const WebSocket = require('ws')

const opts = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4000
}

const clients = []

const wss = new WebSocket.Server(opts, () =>
    console.info(
        `Listening on wss://` +
        `${opts.host}:${opts.port}`))

wss.broadcast = data => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN)
            client.send(data)
    })
}

wss.on('connection', ws => {
    
    console.info('Client connected at', new Date())
    
    ws.on('close', (code, reason) => {
        console.info('Client disconnected at', new Date())
    })
    
    ws.on('error', (...args) => {
        console.error.apply(console, ['Something broke', ...args])
    })
    
    ws.on('message', message => {
        console.info('INCOMING -', message)
        wss.broadcast(message)
    })
    
})
