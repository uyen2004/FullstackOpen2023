const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('favorite blog', () => {
    test('most likes blog', () => {
        const blogs = [
            {
                title: 'The Fault in Our Stars',
                author: 'John Green',
                likes: 96,
            },
            {
                title: 'letranger',
                author: 'Albert Camus',
                likes: 86,
            },
            { 
                title: 'Alex',
                author: 'Pierre Lemaitre',
                likes: 84,
            },
            {     
                title: 'A Tree Grows in Brooklyn',
                author: 'Betty Smith',
                likes: 85,
      }
    ]
  
    const result = listHelper.favoriteBlog(blogs)
  
    const expectedBlog = {
        title: 'The Fault in Our Stars',
        author: 'John Green',
        likes: 96,
    }
    expect(result).toEqual(expectedBlog)
  })
})

const authors = [
  {
    author: "Robert C. Martin",
    blogs: 5,
    likes: 15
  },
  {
    author: "Stephen King",
    blogs: 15,
    likes: 65
  },
  { 
    author: "Albert Camus",
    blogs: 4,
    likes: 10
  },
]

describe('most blogs', () => {
  test('most blog', () => {
    const result = listHelper.mostBlogs(authors)

    console.log(result)

    const expectedAuthor = {
      author: "Stephen King",
      blogs: 15
    }

    expect(result).toEqual(expectedAuthor)
  })
})

describe('most likes', () =>{
  test('author has most likes', () =>{

    const result = listHelper.mostLikes(authors)
    const expectedAuthor = {
      author: "Stephen King",
      likes: 65
    }
    expect(result).toEqual(expectedAuthor)

  })
})
