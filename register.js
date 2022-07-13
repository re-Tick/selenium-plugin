let interval;

function sendMessage(payload) {
  return chrome.runtime.sendMessage("mooikfkahbdckldjjndioackbalphokd", payload);
}

function startPolling(payload, cb) {
  interval = setInterval(() => {
    sendMessage({
      uri: "/health",
      verb: "get"
    }).catch(res => ({error: res.message})).then(res => {
      if (!res) {
        sendMessage({
          uri: "/register",
          verb: "post",
          payload
        }).then(() => {
          console.log("registered");
          cb();
        });
      } else if (res.error) {
        cb(new Error(res.error));
      }
    });
  }, 1000);
}

 function stopPolling() {
  clearInterval(interval);
}

startPolling({
    "name": "Keploy-Plugin", "version": "1.0.0", "commands":[]
}, () => {
    console.log("start Polling completed")
})