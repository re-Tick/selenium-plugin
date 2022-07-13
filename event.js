console.log("event.js is running")
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    console.log("event triggered", message)
    if (message.action === "execute" && message.command) {
      console.log("I need to execute a command");
      return sendResponse(true); // I've finished execution
    }
    if (message.event === "playbackStarted") {
      console.log("IDE notified me a playback was started"); // Responding to events is optional
      return sendResponse(true); // I've finished execution

    }
});
