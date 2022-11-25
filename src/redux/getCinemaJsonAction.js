import axios from 'axios'

// Redux-promise 用法
function getCinemaJsonAction() {
    return axios.get('./config.json').then(res => {
        return {
            type: "change-json",
            payload: res.data
        }
    })
}

export default getCinemaJsonAction