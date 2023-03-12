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

let listbooks = [
	{
		id: "b1",
		name: "Giáo trình tin học cơ bản",
		price: 26000,
		description: "Nội dung sách giáo trình tin học cơ bản",
		coverImage: "THCB.jpg",
		updateAt: "3/12/2023 12:00:00 SA",
		createAt: "3/12/2023 12:00:00 SA",
		quantityStock: 120,
		cdCode: 7,
		publisherCode: 1,
	},
	{
		id: "b2",
		name: "Giáo trình Cở sở dữ liệu",
		price: 12000,
		description: "Nội dung sách giáo trình cơ sở dữ liệu",
		coverImage: "CSDL.jpg",
		updateAt: "3/12/2023 12:00:00 SA",
		createAt: "3/12/2023 12:00:00 SA",
		quantityStock: 25,
		cdCode: 3,
		publisherCode: 2,
	},
	{
		id: "b3",
		name: "Giáo trình kỹ thuật lập trình",
		price: 25000,
		description: "Nội dung sách giáo trình kỹ thuật lập trình",
		coverImage: "KTLT.jpg",
		updateAt: "3/12/2023 12:00:00 SA",
		createAt: "3/12/2023 12:00:00 SA",
		quantityStock: 20,
		cdCode: 4,
		publisherCode: 1,
	},
];

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
});

app.delete("/books/:id", cors(), (req, res) => {
	id = req.params["id"];
	listbooks = listbooks.filter((x) => x.id !== id);
	res.send(listbooks);
});
