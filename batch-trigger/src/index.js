const axios = require('axios');

exports.handler = (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  let payload = {};
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };
  const data = {
    action: "UPDATE_BATCH_COINS"
  }
  const api_url = process.env['LAMBDA_URL'];
  try {
    axios.post(api_url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'text/plain'
      },
    });
    payload.data = "success";
  } catch(e) {
    console.log(e.message);
    payload.message = e.message;
    statusCode = 500;
  }
  const finalResponse = {
    statusCode: statusCode,
    body: JSON.stringify(payload),
    headers: headers
  };
  console.log("======finalResponse====>" + JSON.stringify(finalResponse));
  return finalResponse;
};
