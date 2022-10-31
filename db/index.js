const {Sequelize} = require("sequelize"); //importar sequelize
const users = require("./models/users");

                                //         usuario -Password-puerto       ↓ Nombre de la base de datos a conectar
const sequelize = new Sequelize('postgres://postgres:5432@localhost:5432/DEMO')

// Conectando a la base de datos ↑


                                    // ↓ Inicializamos con 'sequelize'
const User = require("./models/users")(sequelize); //Traemos el modelo 'User'
const Todo = require("./models/Todo")(sequelize); //Traemos el modelo 'Todo'





// usuario puede tener muchas TODO → 1 - n
// Una TODO es creada por un usuario → n - 1 
User.hasMany(Todo);
Todo.belongsTo(User)




module.exports = { db: sequelize, User, Todo}
                // ↑ (db) → hace referencia a todos los modulos directamente, en vez de exportar modulo por modulo