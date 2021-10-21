select *
from department
join roles on department.id = roles.department_id
join employee on employee.roles_id = roles.id;