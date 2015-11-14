module.exports = {
  log: function() {
    var msg = arguments[1];
    var args = Array.prototype.slice.call(arguments);
    var a = ['[bootstrap-sass-loader]: ' + msg];
    a = a.concat(args.slice(2));
    console.log.apply(null, a);
  },
  /**
   * Print verbose level message.
   * @param {object} config Configuration object
   * @param {string} msg Message to display, can contain %O, %s, etc.
   * @returns {void}
   * Add additional arguments as needed for formatting of msg
   */
  verbose: function(config, msg) {
    if (config.verbose) {
      this.log.apply(this, arguments);
    }
  },
  /**
   * Print debug level message.
   * @param {object} config Configuration object
   * @param {string} msg Message to display, can contain %O, %s, etc.
   * @returns {void}
   * Add additional arguments as needed for formatting of msg
   */
  debug: function(config, msg) {
    if (config.debug) {
      this.log.apply(this, arguments);
    }
  }
};
