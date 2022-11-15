var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, post) => {
        return sum + post.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let maxLikes = Math.max(...blogs.map(x => x.likes))
    return blogs.find(x => x.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    if (blogs == null || blogs.length == 0) {
        return null
    }
    const authors = [...blogs.map(x => x.author)];
    return _.head(_(authors)
        .countBy()
        .entries()
        .maxBy(_.last))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}