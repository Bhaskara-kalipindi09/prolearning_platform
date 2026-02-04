import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

import dns from 'dns';

import enrollmentRoutes from './routes/enrollmentRoutes.js';

// ... (other imports)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Force usage of Google Public DNS to resolve "SRV" record issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
