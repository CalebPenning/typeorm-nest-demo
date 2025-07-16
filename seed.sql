-- Create database if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'magazine_db') THEN
      PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE magazine_db');
   END IF;
END$$;

-- Connect to the magazine_db database
\c magazine_db

-- Drop tables if they exist
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS writers;

-- Create writers table
CREATE TABLE writers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Create articles table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    writer_id INTEGER REFERENCES writers(id) ON DELETE CASCADE
);

-- Insert sample writers
INSERT INTO writers (name, email) VALUES
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com')
ON CONFLICT (email) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, content, writer_id) VALUES
('First Article', 'This is the first article.', 1),
('Second Article', 'This is the second article.', 1),
('Bob''s Article', 'Article by Bob.', 2)
ON CONFLICT DO NOTHING; 