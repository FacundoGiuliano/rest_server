const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// conexion con la base de datos
const {connection} = require('../config.db');
//const { request, response, route } = require('..');

const getCarta = (request, response) => {
    connection.query("SELECT * FROM carta",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/carta")
.get(getCarta);

const postCarta = (request, response) => {
    const {plato, descripcion, precio, disponible} = request.body;
    connection.query("INSERT INTO carta(plato, descripcion, precio, disponible) VALUES (?,?,?,?) ",
    [plato, descripcion, precio, disponible],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/carta")
.post(postCarta);

const delCarta = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM carta WHERE id = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/carta/:id")
.delete(delCarta);

module.exports = app;
