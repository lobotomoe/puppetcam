window.onload = () => {
  // Setup message passing
  const port = chrome.runtime.connect(chrome.runtime.id);
  port.onMessage.addListener((msg) => window.postMessage(msg, "*"));
  window.addEventListener("message", (event) => {
    // Relay client messages
    if (event.source === window && event.data.type) {
      port.postMessage(event.data);
    }
    if (event.data.downloadComplete) {
      document.querySelector("html").classList.add("downloadComplete");
    }
  });
};
