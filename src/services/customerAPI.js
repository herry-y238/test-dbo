import axios from 'axios'

export const getCustomer = () => {
    const URL = 'https://jsonplaceholder.typicode.com/posts'
    return axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
    })
}