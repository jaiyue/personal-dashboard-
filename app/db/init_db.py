from app.db.database import get_connection


SCHEMA = """
CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organisation TEXT NOT NULL,
    role TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    summary TEXT
);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    stack TEXT,
    summary TEXT
);

CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    proficiency TEXT
);
"""


def init_db() -> None:
    with get_connection() as connection:
        connection.executescript(SCHEMA)
        connection.commit()


if __name__ == "__main__":
    init_db()
