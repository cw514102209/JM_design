export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('storage')) || {}
}

export function setLocalStorage(options) {
  const storage = JSON.parse(localStorage.getItem('storage')) || {}
  // eslint-disable-next-line
  for (const key in options) {
    storage[key] = options[key]
  }
  localStorage.setItem('storage', JSON.stringify(storage))
}

export function removeLocalStorage(array) {
  const storage = JSON.parse(localStorage.getItem('storage')) || {}
  array.forEach((arr) => {
    delete storage[arr]
  })
  localStorage.setItem('storage', JSON.stringify(storage))
}
