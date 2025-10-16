import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/galetes.json'));
const writeData = (data) => fs.writeFileSync('./db/galetes.json', JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Silvia" };
    const htmlMessage = `<p>Benvingut a<strong>PASTISSERIA LA DOLÇA</strong> enllaç:</p>
                         <a href="/">Home</a>`;
    res.render("galetes", { user, data, htmlMessage });
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const galeta = data.galetes.find(g => g.id === id);
    if (!galeta) return res.status(404).send('Galeta not found');
    res.json(galeta);
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    const newGaleta = { id: data.galetes.length + 1, ...body };
    data.galetes.push(newGaleta);
    writeData(data);
    res.json(newGaleta);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const galetaIndex = data.galetes.findIndex(g => g.id === id);
    if (galetaIndex === -1) return res.status(404).send('Galeta no trobada');
    data.galetes[galetaIndex] = { ...data.galetes[galetaIndex], ...req.body };
    writeData(data);
    res.json({ message: "Galeta modificada" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const galetaIndex = data.galetes.findIndex(g => g.id === id);
    if (galetaIndex === -1) return res.status(404).send('Galeta no trobada');
    data.galetes.splice(galetaIndex, 1);
    writeData(data);
    res.json({ message: "Galeta esborrada" });
});

export default router;
