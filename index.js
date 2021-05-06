const express  = require("express");
const mongoose  = require("mongoose");
const cors  = require("cors");
const helmet  = require("helmet");
const dotenv  = require("dotenv");

//import routes
const authRoutes  = require( "./routes/authentication.js");
const eventRoutes  = require( "./routes/events.js");
const userRoutes  = require( "./routes/users.js");
const reservationRoutes  = require( "./routes/reservations.js");
//load in environment variables from /config/config.env
dotenv.config({path: './config/config.env'});


//connect to mongodb atlas using connection string
mongoose.connect(process.env.MONGODB_URI, 
    {
        useCreateIndex: true, 
        useFindAndModify: true, 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(connection => {
        console.log(`Connected to MongoDB on host ${connection.connection.host} using database ${connection.connection.db.databaseName}`)
    }).catch(error => {
        console.log(`Error: ${error.message}`);
    });

const app = express();
const port = process.env.port || 5000;

//middleware setup for express app
app.use(cors());
app.use(helmet());
app.use(express.json());

//mount routes on app as middleware
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/users', userRoutes);

//listen on specified port
app.listen(port, () => console.log(`Server connected in ${process.env.NODE_ENV} mode on port ${port}`));

module.exports =  app;