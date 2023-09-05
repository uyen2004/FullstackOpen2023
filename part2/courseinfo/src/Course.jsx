import React from 'react';

const Header = ({ name }) => (
    <h1>{name}</h1>
  )
  
  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  )
  
  const Content = ({ parts }) => {
    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)
  
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
        <b>Total of {totalExercises} exercises</b>
      </div>
    )
  }
  

const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )

  export default Course