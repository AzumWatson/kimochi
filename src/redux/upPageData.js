import axios from 'axios'
import store from './store'

// Redux-promise 用法
function getCinemaJsonAction() {
    const { repo, username } = store.getState().Reducer.json.github
    const { pagelist } = store.getState().pageReducer
    return axios.get(`https://api.github.com/repos/${username}/${repo}/issues?state=open&page=${pagelist.page}&per_page=10`).then(res => {
        const newdata = [...pagelist.list, ...res.data]
        const newpage = pagelist.page + 1

        const button = res.data.length < 10 ? true : false

        return {
            type: "listAdd",
            payload: {
                list: newdata,
                page: newpage,
                button: button
            }
        }
    })
}

export default getCinemaJsonAction