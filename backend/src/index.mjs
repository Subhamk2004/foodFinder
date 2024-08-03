import express from 'express';
import userRouter from './routes/userRoute.mjs'
import cartRouter from './routes/cartRoute.mjs'
import cors from 'cors';
import sessionDatabaseHandler from './utils/sessionHandler.mjs'
import loginRouter from './routes/login.mjs'
import logoutRouter from './routes/logoutRouter.mjs'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

const PORT = process.env.PORT || 5000;
app.use(sessionDatabaseHandler);
app.use(userRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(cartRouter);

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

  