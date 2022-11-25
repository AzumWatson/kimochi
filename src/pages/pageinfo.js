import React, { useEffect, useState } from 'react';
import getCinemaJsonAction from '../redux/getCinemaJsonAction';
import store from "../redux/store"
import axios from "axios"
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import taglist from './function/taglist';


export default function Pageinfo() {
    const [data, setData] = useState({})
    const param = useParams()

    useEffect(() => {
        if (store.getState().Reducer.json === null) {
            console.log('Pageinfo 请求数据')
            store.dispatch(getCinemaJsonAction())
        } else {
            console.log('Pageinfo store 缓存')
            const { repo, username } = store.getState().Reducer.json.github
            axios.get(`https://api.github.com/repos/${username}/${repo}/issues/${param.id}?state=open`).then(res => {
                setData(res.data)
            })
        }

        const unSubcribe = store.subscribe(() => {
            console.log('订阅返回数据')
            const { repo, username } = store.getState().Reducer.json.github
            axios.get(`https://api.github.com/repos/${username}/${repo}/issues/${param.id}?state=open`).then(res => {
                setData(res.data)
            })
        })

        return () => {
            unSubcribe()
        }

    }, [])

    console.log(data)

    return (data.user &&
        <div>
            {/* <Markdown>{data.body}</Markdown> */}
            <button className="pure-button pure-button-primary" onClick={() => { window.history.back() }}>返回</button>

            <div className="posts">
                <section className="post">
                    <header className="post-header">

                        <h2 className="post-title">{data.title}</h2>

                        <p className="post-meta">
                            By <a href={data.html_url} className="post-author">{data.user.login}</a> under {taglist(data.labels)}
                        </p>
                    </header>

                    <div className="post-description">
                        <Markdown remarkPlugins={[remarkGfm]}>{data.body}</Markdown>
                    </div>

                </section>
            </div>
        </div>
    )
}
