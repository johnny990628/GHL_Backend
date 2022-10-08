require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connect(process.env.DB_URL).catch((error) => console.log(error));

const APIRouter = require("./routes/api");
const FHIRRouter = require("./routes/fhirApi");
const { router: authRouter } = require("./routes/auth");

const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: process.env.WEB_ORIGIN_URL }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./public/build")));

app.use("/ghl/auth", authRouter);
app.use("/ghl/api", APIRouter);
app.use("/ghl/fhir", FHIRRouter);
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
