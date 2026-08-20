const path = require("path");
const express = require("express");
const { connectToMongoDB } = require("./connect");
const cookieParser = require('cookie-parser');
const URL = require("./models/url");
const { restrictTo, checkForAuth } = require("./middlewares/auth");
const app = express();
const PORT = 8000;


// ROUTES 
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { router: userRoute } = require("./routes/user");


connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("Mongo Error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuth);

app.use("/url", restrictTo(["normal", 'admin']), urlRoute);
app.use("/user",  userRoute);
app.use("/", checkForAuth, staticRoute);


app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    if (!entry) return res.status(404).json({ error: "Short URL not found" });
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));