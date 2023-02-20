import { createTransport } from 'nodemailer';
import { emailRecoveryPassword } from '../utils/email.js';

async function sendEmail(email, token) {
	const transporter = createTransport({
		service: 'Hotmail',
		auth: {
			user: 'no-reply-integrado@outlook.com',
			pass: '//!@1nt3gr4d0//'
		},
	});

	const content = await emailRecoveryPassword(token);

	const emailOptions = {
		from: 'no-reply-integrado@outlook.com',
		to: email,
		subject: 'Recuperação de Senha',
		html: content
	};

	transporter.sendMail(emailOptions, (err, result) => {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Mensagem enviada!!!! ' + result);
		}
	});

	return true;
}

export default sendEmail;