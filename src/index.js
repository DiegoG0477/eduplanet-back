require("dotenv").config();
require("./configs/db.config");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const materialsRouter = require("./routes/materials.routes");
const blogsRouter = require("./routes/blog.routes");
const videosRouter = require("./routes/video.routes");
const comentariosRouter = require("./routes/comments.routes");
const paymentRouter = require("./routes/payment.routes");

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp",
    })
);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/blogs", blogsRouter);
app.use("/v1/videos", videosRouter);
app.use("/v1/comentarios", comentariosRouter);
app.use("/v1/materials", materialsRouter);
app.use("/v1/payment", paymentRouter);

app.listen(PORT, () => {
    console.log("corriendo en el puerto " + PORT);
});