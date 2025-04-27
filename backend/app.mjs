import express from 'express'
import cors from 'cors';  
const app = express()
const port = process.env.PORT || 3000;
import connectDB from './db/db.js'
import router from './Routes/userRoutes.js';
import taskRoutes from "./Routes/taskRoutes.js";


const corsOptions = {
  origin: 'http://localhost:5173',  
  methods: 'GET, POST, PUT, DELETE',  
  credentials: true, 
};

// Use the CORS middleware 
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
