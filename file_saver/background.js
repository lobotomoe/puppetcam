/* global chrome, MediaRecorder, FileReader */

let filename = null;

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    switch (msg.type) {
      case "SET_FILENAME":
        filename = msg.filename;
        break;
      case "SAVE_FILE":
        chrome.downloads.download(
          {
            url: msg.data.url,
          },
          () => {}
        );
        break;
      default:
        console.log("Unrecognized message", msg);
    }
  });

  chrome.downloads.onChanged.addListener(function (delta) {
    if (!delta.state || delta.state.current != "complete") {
      return;
    }
    try {
      port.postMessage({ downloadComplete: true });
    } catch (e) {}
  });
});
