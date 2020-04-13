const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("customEvent", (data) => console.log("customEvent ddata ", data));

emitter.emit("customEvent", {name: "Max"});
