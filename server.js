const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Inicio de servidor"));

const contactEmail = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "********@gmail.com",
		pass: "*********"
	},
});

contactEmail.verify((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Inicio para Envio");
	}
});

router.post("/contact", (req, res) => {
	const name = req.body.firstName + ' ' + req.body.lastName;
	const email = req.body.email;
	const message = req.body.message;
	const phone = req.body.phone;
	const mail = {
		from: name,
		to: "********@gmail.com",
		subject: "Envio de formulario Contacto - Portfolio",
		html: `<p>Name: ${name}</p>
					 <p>Email: ${email}</p>
					 <p>Phone: ${phone}</p>
					 <p>Message: ${message}</p>`,
	};

	contactEmail.sendMail(mail, (error) => {
		if (error) {
			res.status(500).send(error.message);
		} else {
			// res.status(200).send(error.message);
			res.json({ code: 200, status: "Mensaje enviado" });
		}
	});

});
