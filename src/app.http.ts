import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
	console.log("URL", req.url);
	// res.writeHead(200, { "Content-Type": "text/html" });
	// res.write(` <h1>Hola mundo${req.url}</h1>`);
	// res.end();

	const data = { name: "Daniel", age: 27, city: "Sydney" };

	if (req.url === "/") {
		const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(htmlFile);
		return;
	}

	if (req.url?.endsWith(".js")) {
		res.writeHead(200, { "Content-Type": "text/javascript" });
	}
	if (req.url?.endsWith(".css")) {
		res.writeHead(200, { "Content-Type": "text/css" });
	}
	const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
	res.end(responseContent);
});

server.listen(3000, () => {
	console.log("server running");
});
