import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authMiddleware, handleLogin, handleSignup } from './controllers/session.controller';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors(), bodyParser.json());

app.post('/login', handleLogin);
app.post('/signup', handleSignup);

app.use(authMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});