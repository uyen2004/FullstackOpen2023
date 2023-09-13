  var _ = require('lodash')
  const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    let favorite_blog = blogs[0]
  
    for (const blog of blogs) {
      if (blog.likes > favorite_blog.likes) {
        favorite_blog = blog
      }
    }
    return {
      title: favorite_blog.title,
      author: favorite_blog.author,
      likes: favorite_blog.likes,
    }
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
    const mostBlogsAuthor = _.maxBy(blogs, 'blogs')
    console.log(mostBlogsAuthor);
    return {
      author: mostBlogsAuthor.author,
      blogs: mostBlogsAuthor.blogs,
    }
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
    const mostLikesAuthor = _.maxBy(blogs, 'likes')
    console.log(mostLikesAuthor);
    return {
      author: mostLikesAuthor.author,
      likes: mostLikesAuthor.likes,
    }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }