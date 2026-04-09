
import * as AFB from '@redpesk/afb-ws-js';

var afbws;

AFB.afbWsConnect({
    onopen: afbws_opened_cb,
    onabort: afbws_aborted_cb,
});


// Callback for Websocket connection failure
function afbws_aborted_cb(reason, url) {
    console.error('Websocket connection to ',url,' failed: ',reason);
}

// Callback for Websocket connection success
function afbws_opened_cb(aws) {
    console.log("Websocket connection succeeded");
    afbws = aws;
    demo_helloworld();
}

// Callback for Websocket connection opening success
function demo_helloworld() {

    // Set callback for receiving the timerCount event from the helloworld-event API
    afbws.addEvent("helloworld/verb_called", afbws_event_cb);

    console.log("Call helloworld/hello");
    /* Calling a verb returns a Promise;
       .then() sets the callback for call success,
       .catch() sets the callback for call failure */
    // Call testargs verb from helloworld API with JSON argument
    afbws.callPromise('helloworld', 'hello', "Jo")
        .then(afbws_call_success_cb)
        .catch(afbws_call_error_cb);

    console.log("Call notanapi/notaverb");
    // Call a non-existing API to see what happens when an error occurs
    afbws.callPromise('notanapi', 'notaverb', null)
      .then(afbws_call_success_cb)
      .catch(afbws_call_error_cb);

    console.log("Call helloworld/sum");
    // Call subscribe from helloworld-event API, which will subscribe us to the timerCount event
    afbws.callPromise('helloworld', 'sum', [[1, 2, 3, 4]])
        .then(afbws_call_success_cb)
        .catch(afbws_call_error_cb);

}

// Callback for subscribed event receival
function afbws_event_cb(values, name) {
    console.log('Received event %s: %o', name, values);
}

// Callback for verb call success
function afbws_call_success_cb(rc_values) {
    let [rc, values] = rc_values;
    console.log('Call success: %d, %o', rc, values);
}

// Callback for verb call error
function afbws_call_error_cb(rc_values) {
    let [rc, values] = rc_values;
    console.error('Call failed: %d, %o', rc, values);
}

