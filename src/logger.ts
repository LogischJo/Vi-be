import logger from 'better-logging'
import {join} from 'path'
logger(console, {saveToFile: join(__dirname, '..', 'logs', `${Date.now()}.log`)})

const log = {
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug
}

console.log = () => {}
console.info = () => {}
console.warn = () => {}
console.error = () => {}
console.debug = () => {}

export default log
