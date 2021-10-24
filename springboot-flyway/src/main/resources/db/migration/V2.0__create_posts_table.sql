CREATE TABLE posts
(
    id            BIGINT                        NOT NULL AUTO_INCREMENT,
    title         VARCHAR(200)                  NOT NULL,
    `description` LONGTEXT                      NULL,
    status        VARCHAR(10) DEFAULT 'PENDING' NOT NULL,
    author_id     BIGINT                        NOT NULL,
    created_at    datetime                      NULL,
    updated_at    datetime                      NULL,
    CONSTRAINT pk_posts PRIMARY KEY (id)
);

ALTER TABLE posts
    ADD CONSTRAINT uc_posts_title UNIQUE (title);

ALTER TABLE posts
    ADD CONSTRAINT FK_POSTS_ON_AUTHOR FOREIGN KEY (author_id) REFERENCES authors (id);