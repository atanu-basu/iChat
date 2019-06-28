var socket = io.connect("http://localhost:3000");

$(document).ready(function () {
    var handle = $("#handle");
    var message = $("#message");
    var feedback = $('#feedback');
    $("button").click(function () {
        if(handle.val() && message.val() !== ''){
            socket.emit("chat", {
                handle: handle.val(),
                message: message.val()
            })
        } else {
            alert('can not send empty message');
        }
        message.val('');
    })
    // listen to keypress
    $('#message').keypress(function (e) { 
        if(handle.val() !== ''){
            socket.emit('typing', handle.val());
        }else {
            alert('Insert a name first');
        }
    });

    // keypress
    socket.on("chat", (data) => {
            // alert('value'+ data.message);
            feedback.html('');
            var msg = $("#latest");
            msg.append(`<strong>${data.handle}</strong>:&nbsp;${data.message}<br>`);
    })

    //typing event
    socket.on('typing', (data) => {
        feedback.html(`<em> ${data} is typing...</em>`);
    })
})