const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const allowedOrigins = ["http://localhost:5173" , ""];
const corsOption = {
    origin:function(origin , callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true);
        }
        else{
            console.log("blocked by origin: " , origin)
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(helmet());


//routes
const userRoutes = require("./routes/user.routes");
app.use("/api/v1/user" , userRoutes);

const orgRoutes = require("./routes/org.routes");
app.use("/api/v1/org" , orgRoutes);

const applicationRoutes = require("./routes/application.routes");
app.use("/api/v1/application" , applicationRoutes);

const jobRoutes = require("./routes/job.routes");
app.use("/api/v1/job" , jobRoutes);

const portfolioRoutes = require("./routes/portfolio.routes");
app.use("/api/v1/portfolio" , portfolioRoutes);

const saveJobsRoutes = require("./routes/saveJobs.routes");
app.use("/api/v1/savejob" , saveJobsRoutes);

module.exports = app;