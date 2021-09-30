const functions = require("firebase-functions");
const sgMail = require('@sendgrid/mail');


function sendEmail(name, email, message) {
    console.log(email, name, message)
    sgMail.setApiKey('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');
    const msg = {
        to: 'obasuyietiosa@gmail.com', // Change to your recipient
        from:email, // Change to your verified sender
        subject: 'Inqury '+ name,
        html: `<strong>${message}</strong>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(" sendgrid error", error.response.body);
        });

}

exports.contactSubmitted = functions.firestore
    .document('CONTACT/{contactId}')
    .onCreate(async (snapshot, context) => {
        const itemDataSnap =  snapshot.data()
        const message = itemDataSnap.message
        const name = itemDataSnap.name
        const email = itemDataSnap.email
        
        sendEmail(name,email,message);

    });
