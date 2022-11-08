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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}