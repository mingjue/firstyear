CREATE DATABASE first;

CREATE TABLE `user`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE `salary`(
`id` int NOT NULL,
`userId` int NOT NULL,
`dateofSalary` timestamp(6) NOT NULL,
`sum` decimal NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`userId`) REFERENCES user(`id`)
);

SELECT user.name, SUM(salary.sum) AS `Total` FROM `user`,`salary`
  WHERE user.id = salary.userId
  AND salary.dateofSalary >= '2015-04-01'
  AND salary.dateofSalary <= '2015-11-01'
  GROUP BY user.id


SELECT user.name, user.id FROM `user` 
  WHERE user.id NOT IN 
  (SELECT user.id FROM `salary`,`user` 
  WHERE user.id = salary.userId); 