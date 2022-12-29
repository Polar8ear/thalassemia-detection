import React from 'react'
import { useNavigate } from 'react-router-dom'

function Intro() {
  const texts = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam provident explicabo blanditiis soluta similique? Error facilis dolorum beatae nobis eum?',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo quos consequatur a dolorum!',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero et pariatur distinctio dolorem totam architecto, quos corrupti? Necessitatibus!',
  ]

  const [index, setIndex] = React.useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % texts.length)
  }

  const handleBack = () => {
    setIndex((prev) => (prev - 1 + texts.length) % texts.length)
  }

  const handleStart = () => {
    return navigate('/')
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="rounded-lg mx-2 p-4 px-8 max-w-md min-h-[25rem] border-black border flex flex-col">
        <p>{texts[index]}</p>
        <div className="flex justify-around mt-auto">
          <button className='rounded bg-blue-500 text-white px-8 py-2' onClick={handleBack}>Back</button>
          <button className='rounded bg-green-500 text-white px-8 py-2' onClick={handleStart}>Start</button>
          <button className='rounded bg-blue-500 text-white px-8 py-2' onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Intro
