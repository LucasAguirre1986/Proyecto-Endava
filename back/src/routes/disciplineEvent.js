const express = require("express");
const Router = express.Router();
const DisciplineEvent = require("../../db/models").DisciplineEvent;
const Employee = require("../../db/models/").Employee;

Router.post("/", function(req, res) {
  Employee.findOne({
    where: {
      id: req.body.user.id
    }
  }).then(employee => {
    DisciplineEvent.create({
      topic: req.body.data.topic,
      date: req.body.data.date,
      description: req.body.data.observation,
      status: "pending"
    })
      .then(newEvent => {
        return newEvent.setEmployee(employee);
      })
      .then(employeeEvent => res.send(employeeEvent));
  });
});
Router.get("/:id", function(req, res) {
  Employee.findOne({
    // 1) primero traigo el empleado
    where: {
      id: req.params.id
    }
  }).then(employee => {
    DisciplineEvent.findAll({
      //2) Luego busco todos los eventos, incluyendo el modelo Employee,
       //donde el id de empleado coindida con que que me interesa (employee)
      include: [
       
        {
          model: Employee,
          as: "employee",
          where: {
            id: employee.id //3) La tabla intermedia es virtual, ergo no uso mas que "include" y "where"
          },
          attributes:[]
        }

      ],
      attributes:["topic", "status", "date"]
    }).then(eventList => res.send(eventList));
  });
});

module.exports = Router;
