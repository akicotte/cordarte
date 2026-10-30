-- Rode UMA vez, só se o banco já existia (execute uma linha por vez se o Console reclamar)
ALTER TABLE products ADD COLUMN material TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN dims TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN colors TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN lead TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN featured INTEGER DEFAULT 0;
CREATE TABLE IF NOT EXISTS cats(slug TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT DEFAULT '');
