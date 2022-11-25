import React, { useEffect, useState } from 'react';
import getCinemaJsonAction from '../redux/getCinemaJsonAction';
import upPageData from '../redux/upPageData'
import store from "../redux/store"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import taglist from './function/taglist';

export default function Pagelist() {
    const [data, setData] = useState([])
    const [button, setButton] = useState(true)

    useEffect(() => {
        if (store.getState().Reducer.json === null) {
            console.log('PageList 请求数据')
            store.dispatch(getCinemaJsonAction())
        } else {
            console.log('Pagelist store 缓存')
            const { pagelist } = store.getState().pageReducer

            if (pagelist.page === 1) {
                store.dispatch(upPageData())
            } else {
                setData(pagelist.list)
                setButton(pagelist.button)
            }
        }

        const unSubcribe = store.subscribe(() => {
            console.log('订阅返回数据')
            const { pagelist } = store.getState().pageReducer
            if (pagelist.page === 1) {
                store.dispatch(upPageData())
            } else {
                setData(pagelist.list)
                setButton(pagelist.button)
            }
        })

        return () => {
            unSubcribe()
        }

    }, [])

    const toLoad = () => {
        store.dispatch(upPageData())
    }

    const litteInfo = (info) => {
        if (info.search("\r\n\r\n") === -1) {
            return info
        }

        const newInfo = info.split("\r\n\r\n")

        if (newInfo.length <= 2) {
            return info
        }

        return newInfo[0] + "\r\n\r\n" + newInfo[1]
    }

    return (
        <div>
            {data.map(item =>
                <div key={item.id} className="posts">
                    {/* <h1 className="content-subhead"></h1> */}
                    <section className="post">
                        <header className="post-header">
                            <img width="48" height="48" alt="Tilo Mitra's avatar" className="post-avatar" src={item.user.avatar_url + '&s=128'} />

                            <h2 className="post-title"><a className="a-post-title" href={'/#/post/' + item.number}>{item.title}</a></h2>

                            <p className="post-meta">
                                By <a href={item.user.html_url} className="post-author">{item.user.login}</a> under {taglist(item.labels)}
                            </p>
                        </header>

                        <div className="post-description">
                            <Markdown remarkPlugins={[remarkGfm]} >{litteInfo(item.body)}</Markdown>
                        </div>
                    </section>
                    <p className="post-meta" style={{ paddingBottom: "2em" }}>{item.created_at.split('T')[0] + ' ' + item.created_at.split('T')[1].split('Z')[0]}</p>
                </div>
            )}
            <hr /><br />
            {button || <button className="pure-button pure-button-primary" onClick={toLoad}>加载更多文章</button>}
        </div>
    )
}