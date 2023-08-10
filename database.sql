
CREATE DATABASE users;

-- Create the table in the specified schema
CREATE TABLE users(
     user_id SERIAL PRIMARY KEY ,
     email VARCHAR(50) NOT NULL UNIQUE,
     password VARCHAR(50) NOT NULL UNIQUE

);
CREATE TABLE problems(
     problem_id SERIAL PRIMARY KEY ,
     title TEXT NOT NULL UNIQUE,
     difficulty VARCHAR(50) NOT NULL,
     acceptance DECIMAL(5,2) NOT NULL,
     description TEXT,
     exampleIn TEXT,
     exampleOut TEXT


                                
);
INSERT INTO problems (title, difficulty, acceptance, description, exampleIn, exampleOut)
VALUES ('Add Two Numbers', 'Medium', 35, 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contains a single digit. Add the two numbers and return it as a linked list.', 'l1 = [2,4,3], l2 = [5,6,4]', '[7,0,8]');

 INSERT INTO problems(title,difficulty,acceptance,description,exampleIn,exampleOut) VALUES('Add Two Numbers',
'Medium',
35,
'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contains a single digit. Add the two numbers and return it as a linked list.',
'l1 = [2,4,3], l2 = [5,6,4]'
,'[7,0,8]'
 )
       