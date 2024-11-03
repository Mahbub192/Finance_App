export async function initializeDatabase(db) {
  // Uncomment the line below to drop the tables if you need to reset them during development.
  // await db.execAsync("DROP TABLE IF EXISTS income;");
  // await db.execAsync("DROP TABLE IF EXISTS expense;");
  
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        date TEXT,
        amount TEXT,
        incomeType TEXT
      );

    `);
    
    console.log("Database initialized with income tables");
  } catch (error) {
    console.log("Error while initializing database ", error);
  }
}
