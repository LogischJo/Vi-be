import Database from 'better-sqlite3'
import {join} from 'node:path'

const _db = new Database(join(__dirname, '..', 'database', 'LightCluster.db'))

function _prepare() {}
