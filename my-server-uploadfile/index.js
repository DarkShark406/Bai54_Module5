const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3001;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.use(
	fileUpload({
		limits: {
			fieldSize: 1000000,
		},
		abortOnLimit: true,
	})
);

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.get("/image/:id", cors(), (req, res) => {
	id = req.params["id"];
	console.log("upload/" + id);

	res.sendFile(__dirname + "/upload/" + id);
});

app.post("/upload", (req, res) => {
	const { image } = req.files;

	if (!image) return res.sendStatus(400);

	image.mv(__dirname + "/upload/" + image.name);

	//all good
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log("Example app listening on http://localhost:" + port);
});
