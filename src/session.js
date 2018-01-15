const Session = function (options) {
  this.options = Object.assign({}, Session.DEFAULTS, options)

  this.$key = this.options.key
  if (!this.$key) throw "Session cannot be initialized without a key (options.key)"

  this.$storage = (this.options.persistent === true) ? window.localStorage : window.sessionStorage

  this.data = this.fetchSession()
}

Session.DEFAULTS = {
  persistent: false,
  namespace: null
}

Session.prototype.set = function (key, value) {
  if (this.options.namespace) key = this.options.namespace + '.' + key

  this.data[key] = value
  this.saveSession()
}

Session.prototype.get = function (key) {
  if (this.options.namespace) key = this.options.namespace + '.' + key

  return this.data[key]
}

Session.prototype.fetchSession = function () {
  return this.$storage ? JSON.parse(this.$storage.getItem(this.$key) || '{}') : {}
}

Session.prototype.saveSession = function () {
  if (this.$storage) {
    try {
      this.$storage.setItem(this.$key, JSON.stringify(this.data))
    } catch(e) {
      // unable to set, e.g. safari private mode
      console.log('unable to save session', e)
    }
  }
}

Session.prototype.removeSession = function () {
  if (this.$storage) {
    this.$storage.removeItem(this.$key)
  }
}

export default Session
