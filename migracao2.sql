-- Rode UMA vez (uma linha por vez se o Console reclamar)
ALTER TABLE products ADD COLUMN weight REAL;
CREATE TABLE IF NOT EXISTS ship(uf TEXT PRIMARY KEY, base REAL, perkg REAL, days TEXT);
INSERT OR IGNORE INTO ship(uf) VALUES('AC'),('AL'),('AP'),('AM'),('BA'),('CE'),('DF'),('ES'),('GO'),('MA'),('MT'),('MS'),('MG'),('PA'),('PB'),('PR'),('PE'),('PI'),('RJ'),('RN'),('RS'),('RO'),('RR'),('SC'),('SP'),('SE'),('TO');
