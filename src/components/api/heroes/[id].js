import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'heroes.json');

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));

    const updatedData = data.filter(hero => hero.id !== id);
    writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    res.status(200).json({ message: `Hero with id ${id} deleted.` });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}