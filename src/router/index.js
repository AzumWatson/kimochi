import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'

// 引入 Pure Css

import '../css/styles.css'
import '../css/pure-min.css'
import '../css/grids-responsive-min.css'

import PageList from '../pages/pagelist'
import Pageinfo from '../pages/pageinfo'
import About from '../pages/about'
import Comments from '../pages/comments'
import Labels from '../pages/labels'
import Friend from '../pages/friend'

import App from '../App'

// const Test = ()=>{
//     return <>qewqe</>
// }

const HashsRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/' element={<PageList />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/comments' element={<Comments />}></Route>
                <Route path='/links' element={<Friend />}></Route>
                <Route path='/post/:id' element={<Pageinfo />}></Route>
                <Route path='/tag/:labels' element={<Labels />}></Route>
            </Route>
        </Routes>
    </Router>
)

export default HashsRouter