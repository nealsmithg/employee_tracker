insert into department (id, name)
values  ("Front-End Development"),
        ("Back-End Development"),
        ("Testing"),
        ("Deployment"),
        ("Accounting"),
        ("HR");

insert into roles (id, title, salary, department_id)
values  (13, "Jr. Developer", 50000.00, 1),
        (12, "Sr. Developer", 75000.00, 1),
        (11, "Front-End Manager", 100000.00, 1),
        (23,"Jr. Developer", 60000.00, 2),
        (22, "Sr. Developer", 85000.00, 1),
        (21, "Back-End Manager", 105000.00, 1),
        (33, "Jr. Tester", 40000.00, 3),
        (32, "Sr. Tester", 75000.00, 3),
        (31, "Testing Manager", 100000.00, 3),
        (42, "Server Maintenance", 60000.00, 4),
        (41, "Server Manager", 110000.00, 4),
        (52, "Accountent", 60000.00, 5),
        (51, "Accounting Manager", 100000.00, 5),
        (62, "HR clerk", 65000.00, 6),
        (61, "HR Manager", 95000.00, 6);

insert into employee (first_name, last_name, roles_id, manager_id)
values  ("George", "Clooney", 11, null),
        ("Eddie", "Murphy", 21, null),
        ("Harrison", "Ford", 31, null),
        ("Kanye", "West", 41, null),
        ("Taylor", "Swift", 51, null),
        ("Queen", "Latifah", 61, null),
        ("Beyonce", "Knowles", 12, 1),
        ("Ben", "Affleck", 13, 1),
        ("Adel", "Ali", 13, 1),
        ("David", "Beckham", 22, 2),
        ("Carrie", "Underwood", 23, 2),
        ("Daniel", "Radcliffe", 23, 2),
        ("J K", "Rowling", 33, 3),
        ("Jack", "Nicholson", 32, 3),
        ("Jack", "Black", 32, 3),
        ("Ozzy", "Osbourne", 42, 4),
        ("Macaulay", "Culkin", 42, 4),
        ("Salma", "Hayek", 52, 5),
        ("Taylor", "Lautner", 52, 5),
        ("Vin", "Diesel", 62, 6),
        ("Zach", "Galifianakis", 62, 6);