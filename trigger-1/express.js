const express = require('express');
const bodyParser = require('body-parser');
const { handler } = require('./src/index');
const app = express();
const port =process.env.PORT || 8080;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Start Server
app.listen(port, () => {
  console.log(`Function is running on ${port}...setting up route on /api`);
  const router = express.Router();
  app.use(bodyParser.json());

  router.post('/api', async (req, res, next) => {
    // transform payload in to event
    const { requestContext: context, ...event } = req.body;
    try {
      const cback = () => {}; 
      const response = await handler(event, context, cback, req.headers);
      console.log('Response =>', response);
      res.status(200).json(response.body);
    } catch (error) {
      console.error('Failed executing the command. Reason =>', error);
      const errorMsg = {statusCode: error.statusCode || 500, errorMessage: error.body?.message || error.body || error.message};
      res.status(500).json(errorMsg);
	}
  });
  app.use(router);
});
