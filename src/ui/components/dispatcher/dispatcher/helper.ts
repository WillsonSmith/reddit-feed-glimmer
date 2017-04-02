export default function Dispatcher() {
  let listeners = {};

  return {
    register(type, ...callbacks) {
      if (!listeners[type]) {
        listeners[type] = [];
      }
      listeners[type].push(...callbacks);
    },
    remove(type, callback) {
      listeners[type] = listeners[type].filter((listener) => listener !== callback);
    },
    dispatch(event) {
      if (listeners[event.type]) {
        listeners[event.type].forEach((listener) => listener(event));
      }
    }
  }
}
