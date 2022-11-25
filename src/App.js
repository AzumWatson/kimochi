import React, { useEffect, useState } from 'react';
// import getCinemaJsonAction from './redux/getConfigJson';
import store from "./redux/store"
import { Outlet } from 'react-router-dom'


export default function App() {
  const [data, setData] = useState({})

  useEffect(() => {
    if (store.getState().Reducer.json != null) {
      console.log('store 缓存')
      setData(store.getState().Reducer.json)
    }

    const unSubcribe = store.subscribe(() => {
      console.log('订阅返回数据')
      setData(store.getState().Reducer.json)
    })

    return () => {
      unSubcribe()
    }

  }, [])

  const morelink = () => {
    if (!data.indpage) {
      return null
    }

    return data.indpage.map(item =>
      <li className="nav-item" key={Math.random()}>
        <a className="pure-button" href={item[1]}>{item[0]}</a>
      </li>
    )
  }


  return (
    <>
      <div id="layout" className="pure-g">
        <div className="sidebar pure-u-1 pure-u-md-1-4 pure-u-xl-1-5">
          <div className="header">
            <h1 className="brand-title">{data.name}</h1>
            <h2 className="brand-tagline">{data.info}</h2>
            <nav className="nav">
              <ul className="nav-list">
                {morelink()}
              </ul>
            </nav>
          </div>
        </div>
        <div className="content pure-u-1 pure-u-md-3-4 pure-u-xl-4-5">
          <Outlet />
          <div className="footer">Powered by Kimochi · Made with ❤️ by <a target='_blank' href='//github.com/azumwatson'>AzumWatson</a></div>
        </div>
      </div>
    </>
  )
}



