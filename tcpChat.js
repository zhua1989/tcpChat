var net = require('net');
var fs = require('fs');
var port = 2900;
var clients = [];
var server = net.createServer(function(connection) {

	connection.name = connection.remoteAddress + ":" + connection.remotePort 

    var broadcast = function broadcast(message, sender) { //takes in the message and its sender.

        clients.forEach(function(client) {
            client.write(message);
        });

        console.log(message.toString());
    }

    connection.write("Welcome" + connection.name + " to The Chat Room")
    broadcast(connection.name + " just joined the chat Room! ")
        //push connection to array of connections
    clients.push(connection)
    connection.on('data', function(data) {
        var input = data.toString().trim()
        broadcast(data, connection);

    })
    connection.on('end', function() {
        connection.write("someone disconnected!");
        clients.splice(clients.indexOf(connection), 1);
        broadcast("someone left the chat");
    })

})


server.listen(port, function() {
    console.log("Running and Listening " + port)
})
