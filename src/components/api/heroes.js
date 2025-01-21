import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'heroes.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const newHero = req.body;
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));

    newHero.id = Date.now().toString();
    data.push(newHero);

    writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newHero);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}