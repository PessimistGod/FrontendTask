const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


const corsOptions = {
    origin: 'https://frontend-task-main.vercel.app',
  };
  
  app.use(cors(corsOptions));


app.use(bodyParser.json());

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

const sentEmails = [];

app.post('/api/user', (req, res) => {
    const formData = req.body;


    if (sentEmails.includes(formData.email)) {
        return res.status(400).json({
            type: 'error',
            message: 'Email Already Exist!',
        });
    }


    request.get({
        url: process.env.GET_API_URL,
        headers: {
            'Code': process.env.GET_API_ACCESS_CODE, 
        },
    }, (requestError, response, body) => {
        if (requestError) {
            console.error('Error in external GET request:', requestError);
            return res.status(500).json({
                type: 'error',
                message: 'GET request to external API failed. Please check the logs for details.',
            });
        }

        if (response.statusCode === 200) {
            try {
                const data = JSON.parse(body);

                if (!Array.isArray(data)) {
                    console.error('Data from external API is not an array:', data);
                    return res.status(500).json({
                        type: 'error',
                        message: 'Data from external API is not in the expected format.',
                    });
                }

                const emailExists = data.some(item => item.email === formData.email);

                if (emailExists) {
                    return res.status(400).json({
                        type: 'error',
                        message: 'Email Already Exists.',
                    });
                }
            } catch (parseError) {
                console.error('Error parsing response body:', parseError);
                return res.status(500).json({
                    type: 'error',
                    message: 'Error parsing response from external API.',
                });
            }
        }


        request.post({
            url: process.env.POST_API_URL,
            headers: {
                'Code': process.env.POST_API_ACCESS_CODE,
                'Content-Type': 'application/json',
            },
            json: true,
            body: formData,
        }, (postError, postResponse, postBody) => {
            if (postError) {
                console.error('Error in external POST request:', postError);
                return res.status(500).json({
                    type: 'error',
                    message: 'POST request to external API failed. Please check the logs for details.',
                });
            }

            if (postResponse.statusCode === 201) {

                console.log('Resource created successfully:', postBody);

                sentEmails.push(formData.email);
                res.json(postBody);
            } else {

                console.error('Error in external POST request:');
                console.error('Response Error:', postResponse ? postResponse.statusCode : 'N/A');
                console.error('Response Body:', postBody);
                res.status(500).json({
                    type: 'error',
                    message: 'POST request to external API failed. Please check the logs for details.',
                });
            }
        });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
