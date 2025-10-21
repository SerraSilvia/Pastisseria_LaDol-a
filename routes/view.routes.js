import { Router } from "express";
import fs from 'fs';

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));

const viewRouter = Router();

viewRouter.get('/protected', (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send('Accés no autoritzat')
    res.render('home', user)
});

/* GALETES */ 

viewRouter.get('/galetes', (req, res) => {
    const { user } = req.session

    if (!user) return res.status(403).send('Accés no autoritzat');

    /* Obtenemos la lista de galletas */
    const data = readData().galetes;

    res.render('galetes', { user, data });
});

viewRouter.get('/galeta/:id', (req, res) => {
    const { user } = req.session

    if (!user) return res.status(403).send('Accés no autoritzat');

    /* Obtenemos el id de la url */
    const id = parseInt(req.params.id);

    /* Obtenemos el detalle de la galeta */
    const data = readData();
    const galeta = data.galetes.find(g => g.id === id);

    if (!galeta) return res.status(404).send('Galeta no trobada');
    
    res.render('galeta', { user, galeta });
});

viewRouter.get('/nova-galeta', (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send('Accés no autoritzat');
    res.render('nova-galeta', { user });
});

/* PASTISSOS */

viewRouter.get('/pastissos', (req, res) => {
    const { user } = req.session;

    if (!user) return res.status(403).send('Accés no autoritzat');

    const data = readData().pastissos;

    res.render('pastissos', { user, data });
});

viewRouter.get('/pastis/:id', (req, res) => {
    const { user } = req.session;

    if (!user) return res.status(403).send('Accés no autoritzat');

    const id = parseInt(req.params.id);
    const data = readData();
    const pastis = data.pastissos.find(p => p.id === id);

    if (!pastis) return res.status(404).send('Pastís no trobat');

    res.render('pastis', { user, pastis });
});

viewRouter.get('/nou-pastis', (req, res) => {
    const { user } = req.session;

    if (!user) return res.status(403).send('Accés no autoritzat');

    res.render('nou-pastis', { user });
});


/* TORRONS */

viewRouter.get('/torrons', (req, res) => {
    const { user } = req.session;

    if (!user) return res.status(403).send('Accés no autoritzat');

    const data = readData().torrons;

    res.render('torrons', { user, data });
});

viewRouter.get('/torro/:id', (req, res) => {
    const { user } = req.session;

    if (!user) return res.status(403).send('Accés no autoritzat');

    const id = parseInt(req.params.id);
    const data = readData();
    const torro = data.torrons.find(t => t.id === id);

    if (!torro) return res.status(404).send('Torró no trobat');

    res.render('torro', { user, torro });
});

viewRouter.get('/nou-torro', (req, res) => {
    const { user } = req.session;

    if (!user) return res.status(403).send('Accés no autoritzat');

    res.render('nou-torro', { user });
});


export default viewRouter;