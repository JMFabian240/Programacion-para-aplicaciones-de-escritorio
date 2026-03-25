import { app } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

class AppDatabase {
    constructor() {
        const dataDir = path.resolve(process.cwd(), 'data');
        fs.mkdirSync(dataDir, { recursive: true });
        const dbPath = path.join(dataDir, 'to-do.sqlite');
        this.db = new Database( dbPath );
        this.db.pragma('journal_mode = WAL');
        this.setUpDataBase()
        console.log('DB path:', dbPath)
    }

    setUpDataBase(){
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                completed INTEGER NOT NULL DEFAULT 0
            )
        `)
        console.log( 'DB inicialized ')
    }

}
export default AppDatabase;



