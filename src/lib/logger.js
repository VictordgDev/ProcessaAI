const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
}

class Logger {
  constructor() {
    this.level = process.env.LOG_LEVEL || 'info'
  }

  error(message, meta = {}) {
    console.error(`[ERROR] ${message}`, meta)
  }

  warn(message, meta = {}) {
    console.warn(`[WARN] ${message}`, meta)
  }

  info(message, meta = {}) {
    if (this.level === 'info' || this.level === 'debug') {
      console.log(`[INFO] ${message}`, meta)
    }
  }

  debug(message, meta = {}) {
    if (this.level === 'debug') {
      console.log(`[DEBUG] ${message}`, meta)
    }
  }
}

export default new Logger()
