import axios from 'axios'

export const editCustomer = (id, userId, title, body) => {
    const URL = 'https://jsonplaceholder.typicode.com/posts/' + id
    return axios(URL, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
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