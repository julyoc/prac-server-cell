import { Router } from 'express';
import { database } from 'firebase-admin';

const db = database();

interface cell {
    marca?: string;
    modelo?: string;
    storage?: number;
    ram?: number;
}

var cellDB = () => {
    return db.ref('Cellphone');
};

const routes = Router();

routes.route('/cell').get((req, res) => {
    const { id }: any = req.query;
    if (id) {
        cellDB().child(id).once('value').then(value => {
            res.json(value);
        }).catch(err => {
            throw err;
        });
    }

    cellDB().once('value').then(value => {
        res.json(value);
    }).catch(err => {
        throw err;
    })
});


routes.route('/cell').post((req, res) => {
    const { marca, modelo, storage, ram } = req.body;
    const data: cell = {
        marca,
        modelo,
        storage,
        ram
    };
    cellDB().push(data).once('value').then(value => {
        res.json(value);
    }).catch(err => {
        throw(err);
    });
});

routes.route('/cell').put((req, res) => {
    const { id }: any = req.query;
    const { marca, modelo, storage, ram } = req.body;
    const data: cell = {
        marca,
        modelo,
        storage,
        ram
    };
    cellDB().child(id).set(data).then(() => {
        res.send(`celphone with id: ${id}, vas updated`);
    }).catch(err => {
        throw err;
    });
});

routes.route('/cell').delete((req, res) => {
    const { id }: any = req.query;
    cellDB().child(id).remove().then(() => {
        res.send(`cellphone by id: ${id}, was deleted`);
    }).catch(err => {
        throw err;
    });
});


export { routes };