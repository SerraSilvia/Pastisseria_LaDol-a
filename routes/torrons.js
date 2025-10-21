import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/torrons.json'));
const writeData = (data) => fs.writeFileSync('./db/torrons.json', JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Silvia" };
    const htmlMessage = `<p>Benvingut a<strong>PASTISSERIA LA DOLÇA</strong> enllaç:</p>
                         <a href="/">Home</a>`;
    res.render("torrons", { user, data, htmlMessage });
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const torro = data.torro.find(g => g.id === id);
    if (!torro) return res.status(404).send('Torró no trobat');
    res.json(torro);
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    const newTorro = { id: data.torrons.length + 1, ...body };
    data.torrons.push(newTorro);
    writeData(data);
    res.json(newTorro);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const torroIndex = data.torrons.findIndex(g => g.id === id);
    if (torroIndex === -1) return res.status(404).send('Torró no trobat');
    data.torrons[torroIndex] = { ...data.torrons[torroIndex], ...req.body };
    writeData(data);
    res.json({ message: "Torró modificat" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const torroIndex = data.torrons.findIndex(g => g.id === id);
    if (torroIndex === -1) return res.status(404).send('Torró no trobat');
    data.torrons.splice(torroIndex, 1);
    writeData(data);
    res.json({ message: "Torró esborrat" });
});

export default router;
