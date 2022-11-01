// Creando un modelo desde cero === creando una tabla

const { Model, DataTypes } = require("sequelize"); //Importamos

class Todo extends Model { } //Creamos la clase 

module.exports = (sequelize) => {

    // ↓ Inciar el modelo === tabla
    return Todo.init({

        // ↓ los atributos de la tabla
        title: { type: DataTypes.STRING(60) },
        description: { type: DataTypes.TEXT },
        complete: { type: DataTypes.BOOLEAN, defaultValue: false },
        difficult: { type: DataTypes.STRING(50) },

        // con Sequelize se agrega automaticamente el → ID, createdAt, updateAt 

    }, { sequelize, tableName: "Todos" })
// Configuracion del modelo ↑     ↑ Nombre de la tabla, POR DEFECTO SIEMPRE EN PLURAL

};

// defaultValue = Valor por defecto