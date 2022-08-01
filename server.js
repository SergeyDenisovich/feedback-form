const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(bodyParser.json());

app.post('/', function (request, response) {
  if (!request.body) {
    return response.sendStatus(400);
  }

  const formData = request.body;

  const isFieldValid = Object.keys(formData).every((field) => formData[field] !== '');

  const responseData = {
    status: '',
    message: '',
  };

  if (isFieldValid) {
    responseData.status = 'success';
    responseData.message = 'Форма успешно отправлена';
    const jsonContent = JSON.stringify(responseData);

    response.send(jsonContent);
  } else {
    responseData.status = 'error';
    responseData.message = 'Произошла ошибка. Проверьте данные и повторите попытку';
    const jsonContent = JSON.stringify(responseData);

    response.send(jsonContent);
  }
});

app.listen(8000, () => console.log('Сервер запущен...'));
