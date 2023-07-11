const sendRequest = (route, method, body, token = null) => {
  const options = {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (body && Object.keys(body).length !== 0) {
    options.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch("http://localhost:8800" + route, options).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          reject(data.message);
        });
      } else {
        res.json().then((data) => {
          resolve(data);
        });
      }
    });
  });
};

export default sendRequest;
