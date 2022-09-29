import axios from 'axios'

export const fetchData = (fn) => {
    axios.get('url').then((response) => {
        fn(response.data)
    })
}