export default function smallDataStore(instantInitiator:object | null = null) {

  let groupedStores = [];
  let storeActions = function storeActions(object:object): object {
    let store = object;

    return {
      get(key) {
        return store[key];
      },
      set(key, value) {
        store[key] = value;
        return store[key];
      },
      keys() {
        return Object.keys(store);
      },
      update(key, callback) {
        callback(store[key]);
        return store[key];
      }
    }
  }
  let newStore = function newStore(initial:object = {}): object {
      let store = initial;
      let actions = storeActions(store);
      groupedStores.push(actions);
      return actions;
  }

  if (instantInitiator) {
    return newStore(instantInitiator);
  }

  return {
    storeGroup(): Array<object> {
      return groupedStores;
    },
    new: newStore
  }
}
