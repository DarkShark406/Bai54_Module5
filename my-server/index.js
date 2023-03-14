const express = require("express");
const app = express();

const port = 3000;

const morgan = require("morgan");
app.use(morgan("combined"));

app.get("/", (req, res) => {
	res.send("Restful API");
});

app.listen(port, () => {
	console.log("My server listening on http://localhost:" + port);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "books.json");

let listbooks = [];

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	listbooks = JSON.parse(data);
});

function writeToFile() {
	const jsonData = JSON.stringify(listbooks);
	fs.writeFile(filePath, jsonData, (err) => {
		if (err) {
			return;
		}

		console.log("Đã update vào file");
	});
}

app.get("/books", cors(), (req, res) => {
	res.send(listbooks);
});

app.get("/books/:id", cors(), (req, res) => {
	id = req.params["id"];
	let p = listbooks.find((x) => x.id == id);
	res.send(p);
});

app.post("/books", cors(), (req, res) => {
	listbooks.push(req.body);
	res.send(listbooks);

	writeToFile();
});

app.put("/books", cors(), (req, res) => {
	book = listbooks.find((x) => x.id == req.body.id);
	if (book !== null) {
		book.name = req.body.name;
		book.price = req.body.price;
		book.coverImage = req.body.coverImage;
		book.description = req.body.description;
		book.updateAt = req.body.updateAt;
		book.quantityStock = req.body.quantityStock;
		book.cdCode = req.body.cdCode;
		book.publisherCode = req.body.publisherCode;
	}

	res.send(listbooks);

	writeToFile();
});

app.delete("/books/:id", cors(), (req, res) => {
	id = req.params["id"];
	listbooks = listbooks.filter((x) => x.id !== id);
	res.send(listbooks);

	writeToFile();
});
