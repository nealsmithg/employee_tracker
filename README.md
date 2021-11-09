# employee_tracker

## Description

This project allows you to create tables for employees, departments, and roles in your organazation. I allows for the update of new employees, departments, and roles as well.

## Table of Conternts

<ol>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#preview">preview</a></li>
</ol>
    
## Usage
To use this program you will have to download the program files from github to your local computer. From there you will need to use mysql from your turminal from within the db folder and run the command `mysql -u root -p` and then enter the password for your local mysql user. You might also need to use a deferent username if you have changed that. After this you will have to run the schema.sql file using `source schema.sql`. This will create the tables that the program uses. Be sure after you have set up your tables and start entering information you do not run this file again because it will over write the information in the tables. I have also included a seeds.sql file that you could run as well to populate the tables so you can use the program before you enter all the information of you organazation inorder to see if you like the program. To do this you would just run `source seeds.sql` after running the schema.sql file. After this you will need to update the password in the db/connection.js folder to the password for your local mysql user as well as update the username if it has been changed. From there you need to just run the index.js folder in the terminal and the program will take you through the steps to view and change what you disire in the tables.

## Preview

[Video Demo](https://drive.google.com/file/d/1SpNeVhG3wInxEcYqdi_HMv7uggyiAqZz/view)
