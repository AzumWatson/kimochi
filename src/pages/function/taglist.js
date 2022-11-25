const taglist = (arr) => {

    if (arr.length === 0) {
        return <a className="post-category post-category-design" style={{ background: "#5c605c" }} href="#">未分类</a>
    }

    return (
        arr.map(item =>
            <a key={item.id} className="post-category post-category-design" style={{ background: '#' + item.color }} href={'/#/tag/'+ item.name} >{item.name}</a>
        )
    )
}

export default  taglist
