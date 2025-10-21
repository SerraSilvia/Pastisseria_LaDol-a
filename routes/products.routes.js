import { Router } from "express";
import fs from 'fs';

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

const productsRouter = Router();

/* GALETES */

productsRouter.put('/galeta/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const galetaIndex = data.galetes.findIndex(g => g.id === id);

    if (galetaIndex === -1) return res.status(404).send('Galeta no trobada');

    data.galetes[galetaIndex] = { ...data.galetes[galetaIndex], ...req.body };

    writeData(data);

    res.json({ message: "Galeta modificada" });
});

productsRouter.post('/galeta', (req, res) => {
    const data = readData();
    const body = req.body;
    const newGaleta = { id: data.galetes.length + 1, ...body };
    data.galetes.push(newGaleta);
    writeData(data);
    res.json(newGaleta);
});

productsRouter.delete('/galeta/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const galetaIndex = data.galetes.findIndex(g => g.id === id);
    if (galetaIndex === -1) return res.status(404).send('Galeta no trobada');
    data.galetes.splice(galetaIndex, 1);
    writeData(data);
    res.json({ message: "Galeta esborrada" });
});

/* PASTISSOS */

productsRouter.put('/pastis/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pastisIndex = data.pastissos.findIndex(p => p.id === id);

    if (pastisIndex === -1) return res.status(404).send('Pastís no trobat');

    data.pastissos[pastisIndex] = { ...data.pastissos[pastisIndex], ...req.body };

    writeData(data);

    res.json({ message: "Pastís modificat" });
});

productsRouter.post('/pastis', (req, res) => {
    const data = readData();
    const body = req.body;
    const newPastis = { id: data.pastissos.length + 1, ...body };
    data.pastissos.push(newPastis);
    writeData(data);
    res.json(newPastis);
});

productsRouter.delete('/pastis/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pastisIndex = data.pastissos.findIndex(p => p.id === id);
    if (pastisIndex === -1) return res.status(404).send('Pastís no trobat');
    data.pastissos.splice(pastisIndex, 1);
    writeData(data);
    res.json({ message: "Pastís esborrat" });
});

/* TORRONS */

productsRouter.put('/torro/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const torroIndex = data.torrons.findIndex(t => t.id === id);

    if (torroIndex === -1) return res.status(404).send('Torró no trobat');

    data.torrons[torroIndex] = { ...data.torrons[torroIndex], ...req.body };

    writeData(data);

    res.json({ message: "Torró modificat" });
});

productsRouter.post('/torro', (req, res) => {
    const data = readData();
    const body = req.body;
    const newTorro = { id: data.torrons.length + 1, ...body };
    data.torrons.push(newTorro);
    writeData(data);
    res.json(newTorro);
});

productsRouter.delete('/torro/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const torroIndex = data.torrons.findIndex(t => t.id === id);
    if (torroIndex === -1) return res.status(404).send('Torró no trobat');
    data.torrons.splice(torroIndex, 1);
    writeData(data);
    res.json({ message: "Torró esborrat" });
});
export default productsRouter;