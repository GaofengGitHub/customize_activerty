let myStore = {
  set: (key, value) => {
    localStorage.setItem(key, value)
  },
  get: (key) =>
    localStorage.getItem(key),
  clear: () => {
    localStorage.clear()
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}

export default myStore;
