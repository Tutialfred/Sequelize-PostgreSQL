const { Model, DataTypes } = require("sequelize"); //Importamos

class User extends Model { } //Creamos la clase 

module.exports = (sequelize) => {

    // ↓ Inciar el modelo === tabla
    return User.init({

        // ↓ los atributos de la tabla
        firstName: { type: DataTypes.STRING(20), allowNull: false},

        lastname: { type: DataTypes.STRING(20), allowNull: false , 
        // Traer los datos(apellido) siempre en mayuscula, sin modificar los originales de la base de datos
        get (){
            return this.getDataValue("lastname").toUpperCase()
        }
        },
                                            // ↓ Si es unico  ↓ Validadores(valiudators)
        email: { type: DataTypes.STRING(200), unique: true, validate: {isEmail:true},
        // Modificar el valor previo a llegar a la base de datos → EXAMPLE = Antes de guardar la contraseña , que pase por una funcion hash y la guardamos hasheada
        set(valor) {         // ↓ Atributo que quiero setear 
            this.setDataValue("email", valor.toLowerCase()) //Guarda siempre el email en minuscula
        } },


        ShowFullName: { type: DataTypes.VIRTUAL, //Crear atributo virtual
        get () {
            return `${this.getDataValue("firstName")} ${this.getDataValue("lastname")}` //Crea un atributo que solo vive en sequelize con nombre y apellidos juntos, sin modificar a la base de datos
        }
    }



    // con Sequelize se agrega automaticamente el → ID, createdAt, updateAt 
    }, { sequelize, tableName: "MyUsers" })
    // Configuracion del modelo ↑    ↑ Nombre de la tabla 
};


// unique = tiene que ser unico
// allowNull = permitir si puede estar vacio, o si tiene que ser obligatorio
// validate = para validarar cierto datos
// VIRTUAL = no se va a impactar en la base de datos, solo existe en sequelize