select *
from department
join roles on department.id = roles.department_id
join employee on employee.roles_id = roles.id;

select 
    roles.id, 
    roles.title, 
    roles.salary, 
    department.name
    from roles 
    join department 
    on department.id = roles.department_id;

select e.id, concat(e.first_name, " ", e.last_name) as "Name", roles.title, department.name, roles.salary, concat(m.first_name, " ", m.last_name) as "Manager Name"
from employee e
left join employee m on e.manager_id = m.id
join roles on e.roles_id = roles.id
join department on department.id = roles.department_id
order by e.id asc;