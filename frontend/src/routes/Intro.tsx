import React from 'react'
import { useNavigate } from 'react-router-dom'

import aiPresentationImage from '../assets/images/AiPresentPic.png'
import comparisonImage from '../assets/images/comparison.jpeg'
import anaemiaImage from '../assets/images/anaemia.jpg'
import treamentImage from '../assets/images/treatment.jpg'
import knowledgeBaseImage from '../assets/images/knowledgeBase.jpg'
import yolov5Image from '../assets/images/yolov5.png'

function Intro() {
  const texts = [
    '',
    'Thalassemia is a genetic blood disorder that affects the production of haemoglobin, a protein that carries oxygen in the red blood cells. Thalassemia is caused by mutations in the genes that code for the production of haemoglobin. There are two main types of thalassemia: alpha thalassemia and beta thalassemia. Alpha thalassemia occurs when there are mutations in the genes that code for the alpha globin chains of haemoglobin, while beta thalassemia occurs when there are mutations in the genes that code for the beta globin chains of haemoglobin.',
    'Thalassemia can range from mild to severe, depending on the number and severity of the gene mutations. In mild cases, thalassemia may not cause any symptoms or may only cause mild anaemia. In severe cases, thalassemia can cause severe anaemia, organ damage, and other health problems. Thalassemia is most common in people of African, Mediterranean, or Southeast Asian descent.',
    'Early detection and treatment of thalassemia is crucial to prevent or mitigate the effects of the disease. Diagnosis of thalassemia is usually done through blood tests, including a complete blood count (CBC), a haemoglobin electrophoresis test, and a genetic test. Treatment of thalassemia can involve regular blood transfusions, folic acid supplements, and in some cases, bone marrow transplants. Therefore we propose the use of artificial intelligence to help the detection of thalassemia for efficiency to reduce cost and burden of healthcare systems. Click "Start" below to try now',
    'Based on observations and research, the microscopic blood sample of a Thalassemia patient will show two significance differences from a normal blood sample. Thalassemia microscopic blood sample will have low concentration of red blood cells and high ratio of malformed red blood cells. This is caused by lack of haemoglobin in the red blood cells. ',
    'YOLOv5 (You Only Look Once version 5) is a real-time object detection model developed by Joseph Redmon and Ali Farhadi of the University of Washington. It is an improvement over previous versions of YOLO (v3 and v4) and is considered to be one of the fastest and most accurate object detection models currently available. YOLOv5 is trained on a large dataset of images and is able to detect and classify objects in real-time, making it useful for a variety of applications such as self-driving cars, security systems, and robotics.'
  ]

  const images = [
    aiPresentationImage,
    comparisonImage,
    anaemiaImage,
    treamentImage,
    knowledgeBaseImage,
    yolov5Image,
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
    return navigate('/system')
  }

  return (
    <div className="h-full w-full flex justify-center items-center box-border ">
      <div className="rounded-lg mx-2 p-4 max-w-md min-h-[20rem] border-black border flex flex-col">
        <img
          className='object-cover'
          src={images[index]}
          alt="Picture"
        />
        <p
          className='py-8'
        >{texts[index]}</p>
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
