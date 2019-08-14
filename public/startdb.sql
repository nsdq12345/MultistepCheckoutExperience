USE checkout;
DROP TABLE person;
DROP TABLE address;
DROP TABLE payment;
DROP TABLE checkout;

CREATE TABLE checkout(
    id integer AUTO_INCREMENT,
    person_id integer,
    address_id integer,
    payment_id integer,
    PRIMARY KEY (id)
);

CREATE TABLE person(
    id integer AUTO_INCREMENT,
    checkout_id integer,
    first_name VARCHAR(32),
    last_name VARCHAR(32),
    email VARCHAR(32),
    password VARCHAR(32),
    PRIMARY KEY (id),
    FOREIGN KEY (checkout_id)
        REFERENCES checkout(id)
        ON DELETE CASCADE
);

CREATE TABLE address(
    id integer AUTO_INCREMENT,
    checkout_id integer,
    line1 VARCHAR(32),
    line2 VARCHAR(32),
    city VARCHAR(32),
    state VARCHAR(32),
    zip VARCHAR(32),
    PRIMARY KEY (id),
    FOREIGN KEY (checkout_id)
        REFERENCES checkout(id)
        ON DELETE CASCADE
);

CREATE TABLE payment(
    id integer AUTO_INCREMENT,
    checkout_id integer,
    credit_card_number VARCHAR(32),
    exp_date VARCHAR(32),
    zip VARCHAR(32),
    PRIMARY KEY (id),
    FOREIGN KEY (checkout_id)
        REFERENCES checkout(id)
        ON DELETE CASCADE
);