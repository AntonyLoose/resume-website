const express = require("express");
const path = require("path");
const PORT = process.env.port || 8080;

const app = express();
app.use(express.static("public"));

app.get("/", (_, res) => {
    res.status(200);
    res.set("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "/pages/about-me.html"));
});

app.get("/resume", (_, res) => {
    res.status(200);
    res.set("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "/public/resume.pdf"), {
        headers: {
            "Content-Type": "application/pdf"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
