const Sequelize = require ("sequelize");
const db  = require ("../index")

const Allowance = db.define("allowance",{
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    fixedAmount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    limitDay:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imgUrl:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    completeName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    active:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
})

const AllowanceDetail = db.define("AllowanceDetail",{
    amount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    employeeAmount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    paymentDate:{
        type: Sequelize.DATEONLY,
        allowNull:false
    },
    observation:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    receiptPath:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    status:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
})
const Employee_Allowance = db.define("employee_allowance",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
})

module.exports= {
    Allowance,
    AllowanceDetail,
    Employee_Allowance
};
