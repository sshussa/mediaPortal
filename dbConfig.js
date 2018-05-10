const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

dbConfig={
	
		user: '',
        password: '',
        server: '', 
        database: ''
}

const  executeQuery = async function(query) {
try {
    let pool = await new sql.connect(dbConfig);
    let result = await pool.request().query(query);
    return {success: result};
  } catch (err) { 
    return {err: err};
  } finally {
    sql.close(); //closing connection after request is finished.
  }
}

app.post('/subscription', function(req , res){
                const query = "INSERT INTO [BRINKER_MEDIA_ROOM] VALUES ('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.email+"','"+req.body.company+"','"+req.body.phone+"')";
                executeQuery (query);
			
				const mailOptions = {
				  from: 'hussainshafeeqsyed@gmail.com',
				  to: req.body.email,
				  subject: 'Welcome Emal',
				  text: 'Thank you for subscribing to receive email alerts from Brinker International!'
				};
				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
					console.log(error);
				  } else {
					console.log('Email sent: ' + info.response);
				  }
				});
				
});