import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/pastissos.json'));
const writeData = (data) => fs.writeFileSync('./db/pastissos.json', JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Silvia" };
    const htmlMessage = `<p>Benvingut a<strong>PASTISSERIA LA DOLÇA</strong> enllaç:</p>
                         <a href="/">Home</a>`;
    res.render("pastissos", { user, data, htmlMessage });
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pastis = data.pastissos.find(g => g.id === id);
    if (!pastis) return res.status(404).send('Pastís no trobat');
    res.json(pastis);
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    const newPastis = { id: data.pastissos.length + 1, ...body };
    data.pastissos.push(newPastis);
    writeData(data);
    res.json(newPastis);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pastisIndex = data.pastissos.findIndex(g => g.id === id);
    if (pastisIndex === -1) return res.status(404).send('Pastís no trobat');
    data.pastissos[pastisIndex] = { ...data.pastissos[pastisIndex], ...req.body };
    writeData(data);
    res.json({ message: "Pastís modificat" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pastisIndex = data.pastissos.findIndex(g => g.id === id);
    if (pastisIndex === -1) return res.status(404).send('Pastís no trobat');
    data.pastissos.splice(pastisIndex, 1);
    writeData(data);
    res.json({ message: "Pastís esborrat" });
});

export default router;
