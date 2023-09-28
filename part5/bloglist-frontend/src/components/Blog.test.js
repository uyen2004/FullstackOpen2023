import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import Blog from './Blog';
import '@testing-library/jest-dom'

describe('Blog Component', () => {
  let component;
  const blog = {
    title: 'Sample Blog Post',
    author: 'John Doe',
    url: 'https://example.com/sample-blog',
    likes: 16,
    user: {
        name: 'Ian', 
      },
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  const mockLikeHandler = jest.fn();

  test('renders title and author by default', () => {
    const element = screen.getByText('Sample Blog Post John Doe')
    expect(element).toBeDefined()
  });

test('renders URL and likes after clicking "View Details"', () => {
    const button = component.getByText('View Details');
    fireEvent.click(button);
    
    expect(component.container.querySelector('.url')).toBeDefined();
    expect(component.container.querySelector('.likes')).toBeDefined();
  });

  test('like button click handler is called twice when clicked twice', () => {
    const blog = {
      id: 1, 
      title: 'Sample Blog Post',
      author: 'John Doe',
      url: 'https://example.com/sample-blog',
      likes: 16,
    };
  
    const mockHandleLikeClick = jest.fn();
  
    const { getByTestId } = render(
      <Blog
        blog={blog}
        handleLikeClick={mockHandleLikeClick} 
        handleDeleteClick={() => {}}
        user={null}
      />
    );
  
    const toggleDetailsButton = getByTestId(`toggle-details-${blog.id}`);
    fireEvent.click(toggleDetailsButton);
  
    const likeButton = getByTestId(`like-button-${blog.id}`);
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
  
    expect(mockHandleLikeClick).toHaveBeenCalledTimes(2);
  });
  
});






