import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        username: 'postgres',
        database: 'Connect4',
        password: process.env.DATABASE_PASSWORD,
        logging: false,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    })

export default sequelize