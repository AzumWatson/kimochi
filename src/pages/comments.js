import React, { useEffect, useState } from 'react';
import getCinemaJsonAction from '../redux/getCinemaJsonAction';
import store from "../redux/store"
import axios from "axios"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Comments() {
    const [data, setData] = useState({})

    useEffect(() => {
        if (store.getState().Reducer.json === null) {
            console.log('Pageinfo 请求数据')
            store.dispatch(getCinemaJsonAction())
        } else {
            console.log('Pageinfo store 缓存')
            const { repo, username } = store.getState().Reducer.json.github
            axios.get(`https://api.github.com/repos/${username}/${repo}/issues?state=closed&labels=Comments`).then(res => {
                setData(res.data[0])
            })
        }

        const unSubcribe = store.subscribe(() => {
            console.log('订阅返回数据')
            const { repo, username } = store.getState().Reducer.json.github
            axios.get(`https://api.github.com/repos/${username}/${repo}/issues?state=closed&labels=Comments`).then(res => {
                setData(res.data[0])
            })
        })

        return () => {
            unSubcribe()
        }

    }, [])

    console.log(data)

    return (
        data.user &&
        <div>
            {/* <Markdown>{data.body}</Markdown> */}

            <div className="posts">
                <section className="post">
                    <header className="post-header">

                        <h2 className="post-title">{data.title}</h2>
                    </header>

                    <div className="post-description">
                        <Markdown remarkPlugins={[remarkGfm]}>{data.body}</Markdown>
                    </div>
                </section>
            </div>
        </div>
    )
}
