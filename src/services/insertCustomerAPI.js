import axios from 'axios'

export const insertCustomer = (userId, title, body) => {
    const URL = 'https://jsonplaceholder.typicode.com/posts'
    return axios(URL, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        'content-type': 'application/json', // whatever you want
      }
    })
      .then(response => response)
      .catch(error => {
        throw error;
    })
}