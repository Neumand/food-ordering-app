const accountSid = 'AC880793fadb4fc7beb1163a9ad6f9ae2b';
const authToken = '6521571017383ce3ac4d6b0cbb56a4e5';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is pretty cool!',
     from: '+14388060140',
     to: '+15149289639'
   })
  .then(message => console.log(message.sid));
