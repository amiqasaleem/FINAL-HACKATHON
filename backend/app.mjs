import express from 'express'
import cors from 'cors';  // Import the CORS package
const app = express()
const port = process.env.PORT || 3000;

import connectDB from './db/db.js'
// import userRoutes from '../routes/userRoutes.js';
import router from './Routes/userRoutes.js';
import taskRoutes from "./Routes/taskRoutes.js";


// CORS configuration to allow requests from the React app
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow only this URL (React app) to make requests
  methods: 'GET, POST, PUT, DELETE',  // Allow these HTTP methods
  credentials: true,  // Allow credentials (like cookies or authorization headers)
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));
//body parser
app.use(express.json());

//connect to database
connectDB();
// Use the routes
app.use('/api/users', router);
app.use("/api/tasks", taskRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
