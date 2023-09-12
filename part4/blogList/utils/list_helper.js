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
  
  module.exports = {
    favoriteBlog,
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }