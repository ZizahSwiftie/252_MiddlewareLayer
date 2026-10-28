import express from 'express';
import pg from 'pg';
import joi from 'joi';

const app = express();
const port = 3001;
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'postgres',
    port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        console.log({
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });

    next();
});

function successResponse(res, data, statusCode = 200) {
    res.status(statusCode).json({
        status: 'success',
        data: data
    });
}

function errorResponse(res, message, status, details = null) {
    res.status(status).json({
        status: false,
        message,
        data: null,
        error: details,
    });
}

