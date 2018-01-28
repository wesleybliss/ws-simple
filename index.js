
(function() {
    
    let ws = null
    const address = 'ws://0.0.0.0:4000'
    const formSend = document.querySelector('#send-form')
    const textMessage = document.querySelector('#message')
    const listMessages = document.querySelector('#messages')
    
    function connect() {
        
        // Make sure WS is in a state it can connect from
        if (ws && Array(0, 1, 2).includes(ws.readyState))
            return
        
        window.WebSocket = window.WebSocket || window.MozWebSocket
        
        if (!window.WebSocket)
            return window.alert('No sockets for you!')
        
        try {
            ws = new WebSocket(address)
            ws.onopen = handleWsOpen
            ws.onerror = handleWsError
            ws.onmessage = handleWsMessage
        }
        catch (e) {
            handleWsError(e)
        }
        
    }
    
    function handleWsError(e) {
        console.error('WS', e)
    }
    
    function handleWsOpen(e) {
        console.info('WS', 'Connected', e)
        if (ws.readyState === 1)
            console.info('WS', 'Connected, online')
    }
    
    function handleWsMessage(e) {
        console.info('INCOMING -', e)
        const li = document.createElement('li')
        li.innerText = e.data
        listMessages.insertBefore(li, listMessages.children[2])
    }
    
    function sendMessage() {
        if (!ws) {
            console.warn('WS not ready, not sending')
            return
        }
        if (!textMessage.value || textMessage.value == '') {
            console.warn('WS not ready, not sending')
            return
        }
        console.info('SEND', textMessage.value)
        ws.send(textMessage.value)
    }
    
    formSend.onsubmit = e => {
        e.preventDefault()
        sendMessage()
    }
    
    textMessage.onkeypress = e => {
        console.log(e)
    }
    
    connect()
    
})();