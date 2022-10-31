const { where, Op } = require("sequelize");
const { db, User, Todo } = require("./db")



// 🎈 MODULOS POR MODULOS (TABLAS)
const creatingS = async() => {
    await User.sync({ alter: true}) //alter: true (alterar la tabla) - force: true (borrar toda la tabla)
    await Todo.sync()
};




// // 🎈 Todos los modulos incorportados con → 'db'
const creating = async () => {
    await db.sync({ alter: true });


    // 🧶Creando un usuario en la tabla de la base de datos
    // const user = await User.create({
    //     firstName: "Miguel",
    //     lastname: "Arias",
    //     email: "MiguelA@henry.com"
    // });

    // console.table(user.toJSON());



    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮SEGUNDA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮

    // Creando un usuario en la base de datos, si ya existe cierto atributo no lo crea
    // Sirve para no repetir ciertos datos repetidos a la base de datos

    const [user2, userCreated] = await User.findOrCreate({
        where: { firstName: "OSCAR", lastname: "ZAVALA", email: "OZ@henry.com" }, //← Si esto no existe... ↓ creo estos datos 'dafault'
        default: {    // ↓ Creando datos si where no encuentra nada
            firstName: "OSCAR",
            lastname: "ZAVALA",
            email: "OZ@henry.com"
        }
    });
    console.table([user2.toJSON(), userCreated]);
}

// creating()












// QUERIES, Consultas ↓

// 🔎 Traernos informacion de la base de datos === SELECT 

const bringAll = async () => {
    await db.sync({ alter: true })


    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 PRIMERA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮

                            // Traer toda la informacion, registros
    const users = await User.findAll()//te trae un array (Clase 'users') de instancias del usuario === objeto complejo
    // console.table(users.map(e => e.toJSON())) // Convertir OR extraer a objeto planos


    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 SEGUNDA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮


    const users2 = await User.findAll({ attributes: ["firstName", "lastname"] }) //Traeme todos con solamente estos atributos (columna)
    // console.table(users2.map(e => e.toJSON()))


    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 TERCERA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮


    const user3 = await User.findAll({ where: { firstName: "Alfredo" } }) //Traeme los datos DONDE cuyo 'clave y valor' sean estos
    // console.table(user3.map(e => e.toJSON()))


    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 CUARTA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮

    //  limite ↓        ↓ saltea estos 5 pasos
    const user4 = await User.findAll({ where: { firstName: { [Op.iLike]: "%a%" } }, limit: 5, offset: 5 }) //Traeme cuya clave(columna), su valor(fila) contenga esta %letra% 
    // console.table(user4.map(e => e.toJSON()))


    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 QUINTA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮

    // Por defecto 'ascendente' → agregamos para descendente
    const user5 = await User.findAll({ where: { firstName: { [Op.iLike]: "%a%" } }, order: [["firstName", "desc"]] });
    // console.table(user5.map(e => e.toJSON()))


    // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 SEXTA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮

    // Buscar elementos por ID 
    const user6 = await User.findByPk(5);
    // console.table(user6.toJSON())


     // 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮 SEPTIMA OPCION 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮

    // ↓ Traeme el primer registro coincida con esta ↓ busqueda
    const user7 = await User.findOne({ where: { firstName: { [Op.iLike]: "%a%" } } });
    // console.table(user7.toJSON());
}
// bringAll();




// 🌳 Actualizar registro de la base de datos

const update = async () => {
    await db.sync({ alter: true })

    const response = await User.update({firstName: "oscar 142"},{ where: {email : "OZ@henry.com"}});

    console.table(response)
}
// update()



// 🌳 Elminar registro de la base de datos

const deleting = async () => {
    await db.sync({ alter: true })

    const deleted = await User.destroy({where : { "lastname" : ""}});

    console.table(deleted);
}
// deleting()





// TEST

const test = async () =>{
    await db.sync({alter: true})

    const show = await User.create({firstName: "Kratos", lastname: "DIOS", email: "KRATOS@Henry.Com"} )

    // console.table(show.map(e => e.toJSON()))
    console.log(show.toJSON());
}
test()
