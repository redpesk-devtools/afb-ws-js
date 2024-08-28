import { AFB, AFBEvent, AFBReply } from '@redpesk/afb-ws';

let afb = new AFB('');
// open Websocket connection with success and failure callbacks
let ws = new afb.ws(ws_on_open_cb, ws_on_abort_cb);

// Callback for Websocket connection opening failure
function ws_on_abort_cb() {
    console.error('Websocket connection failed');
}

// Callback for Websocket connection opening success
function ws_on_open_cb() {
    console.log("Websocket connection succeeded");

    // Set callback for receiving the timerCount event from the helloworld-event API
    ws.onevent("helloworld-event/timerCount", ws_on_event_cb);

    console.log("Call helloworld/testargs");
    /* Calling a verb returns a Promise;
       .then() sets the callback for call success,
       .catch() sets the callback for call failure */
    // Call testargs verb from helloworld API with JSON argument
    ws.call('helloworld/testargs', {'cezam': 'open'})
        .then(ws_call_success_cb)
        .catch(ws_call_error_cb);

    console.log("Call notanapi/notaverb");
    // Call a non-existing API to see what happens when an error occurs
    ws.call('notanapi/notaverb', null)
      .then(ws_call_success_cb)
      .catch(ws_call_error_cb);

    console.log("Call helloworld/subscribe");
    // Call subscribe from helloworld-event API, which will subscribe us to the timerCount event
    ws.call('helloworld-event/subscribe', null)
        .then(ws_call_success_cb)
        .catch(ws_call_error_cb);

    console.log("Call helloworld-event/startTimer");
    // Call startTimer verb from helloworld-event API, which will start sending timerCount events
    ws.call('helloworld-event/startTimer', null)
        .then(ws_call_success_cb)
        .catch(ws_call_error_cb);
}

// Callback for subscribed event receival
function ws_on_event_cb(event: AFBEvent) {
    console.log('Received event: ', event);
}

// Callback for verb call success
function ws_call_success_cb(res: AFBReply) {
    console.log('Received call reply: ', res);
}

// Callback for verb call error
function ws_call_error_cb(err: AFBReply) {
    console.error('Call failed: ', err);
}
