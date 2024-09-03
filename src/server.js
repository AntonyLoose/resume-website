const express = require("express");
const path = require("path");
const PORT = process.env.port || 8080;

const app = express();
app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
	res.status(200);
	res.set("Content-Type", "text/html");
	res.sendFile(path.join(__dirname, "/pages/landing.html"));
})

app.get("/about-me", (_, res) => {
	res.status(200);
	res.set("Content-Type", "text/html");
	res.sendFile(path.join(__dirname, "/pages/about-me.html"));
})

app.get("/experience", (_, res) => {
	res.status(200);
	res.set("Content-Type", "text/html");
	res.sendFile(path.join(__dirname, "/pages/experience.html"));
})

app.get("/education", (_, res) => {
	res.status(200);
	res.set("Content-Type", "text/html");
	res.sendFile(path.join(__dirname, "/pages/education.html"));
})

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
})
