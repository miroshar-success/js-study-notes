class Bus extends EventTarget {
  on(type, listener) {
    this.addEventListener(type, listener)
  }
  off(type, listener) {
    this.removeEventListener(type, listener)
  }
  emit(type, data) {
    this.dispatchEvent(new CustomEvent(type, {
      detail: data
    }))
  }
}

const bus = new Bus()