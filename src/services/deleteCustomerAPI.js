import axios from 'axios'

export const deleteCustomer = (id) => {
    const URL = 'https://jsonplaceholder.typicode.com/posts/' + id
    return axios(URL, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(response => response)
      .catch(error => {
        throw error;
    })
}