const backBtn = document.getElementById("backBtn");
const resentBtn = document.getElementById("resentBtn");
const emailForm = document.getElementById("emailForm");
const response = document.getElementById("response");
const resMessage = document.getElementById("resMessage");

const showResponse = (message) => {
	resMessage.innerHTML = message;
	removeClass(emailForm, "email-form");
	addClass(emailForm, "hidden");
	removeClass(response, "hidden");
	addClass(response, "response");
};

const sendEmail = () => {
	const email = document.getElementById("email").value;
	const name = document.getElementById("name").value;
	const message = document.getElementById("message").value;

	Email.send({
		Host: "smtp.elasticemail.com",
		Username: process.env.SMTP_ENTYPE_USERNAME,
		Password: process.env.SMTP_ENTYPE_PASSWORD,
		To: "smachewgedefaw@gmail.com",
		From: "doeslucithinksgood@gmail.com",
		Subject: "About enType",
		Body: `Name: ${name} \n Email: ${email} \n Message: ${message}`,
	}).then((message) => {
		if (message === "OK") {
			showResponse("Your Message Is Delivered Successfully!");
		} else {
			showResponse("Sorry! Something Goes Wrong!");
		}
	});
};
