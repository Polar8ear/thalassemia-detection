import axios from 'axios'
import React, { useState } from 'react'
import noimage from '../assets/noimage.png'

type Result = Record<string, number>

function App() {
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>(noimage)

  const highestThalassemiaType = result
    ? Object.entries(result).reduce((prev, curr) => {
      if (curr[1] > prev[1]) {
        return curr
      }

      return prev
    })
    : null
  const confirmedThalassemiaType = highestThalassemiaType
    ? highestThalassemiaType[1] > 0.5
      ? highestThalassemiaType[0]
      : null
    : null

  const handleFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const image = e.currentTarget.files?.item(0)

    if (image == null) {
      setImageSrc(noimage)
      setResult(null)
      return
    }

    setImageSrc(URL.createObjectURL(image))

    const formData = new FormData()
    formData.append('image', image)

    type Response = {
      success: true
      results: Result
    } | {
      success: false
      error: string
    }

    setLoading(true)
    try {
      const response = await axios.post<Response>(`${import.meta.env.VITE_API_BASE_URL}/v1/thalassemia-detection`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          // if (progressEvent.total)
          //   console.log(progressEvent.loaded / progressEvent.total)
        },
      })
      if (response.data.success) {
        setResult(response.data.results)
      } else {
        throw new Error(response.data.error)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        setTimeout(() => setError(''), 5000)
      }
    }
    setLoading(false)

  }

  return (
    <div className="h-full w-full">
      {error && <div
        className='absolute inset-0 grid place-items-center bg-red-500 bg-opacity-75 text-white z-50'
      >
        {error}
      </div>}

      {loading && <div
        className='absolute inset-0 grid place-items-center bg-slate-500 bg-opacity-75 z-50'
      >
        Loading...
      </div>}

      <div className='flex flex-col justify-center items-center md:flex-row h-full lg:mx-52'>
        <div className='flex flex-col justify-center items-center w-full mx-4 max-w-sm flex-1'>
          <img
            className='object-contain mx-8 my-2 rounded-lg aspect-square overflow-clip border border-slate-600'
            src={imageSrc}
          />
          <button className='relative w-full p-2 rounded-lg bg-blue-500 text-white my-2'>
            <input type="file" accept='image/*' onInput={handleFileUpload} className='opacity-0 absolute inset-0' />
            <span>Select File</span>
          </button>
          <p>Upload a microscopic picture of blood to detect thalassemia.</p>
        </div>
        <div className='flex items-center justify-center flex-1'>
          <div className='text-2xl'>
            {imageSrc !== noimage && !loading && (confirmedThalassemiaType != null
              ? confirmedThalassemiaType === 'normal'
                ? <p>You don't have thalassemia</p>
                : <p>You have {confirmedThalassemiaType} thalassemia. Please get consultation from a doctor.</p>
              : <p>We cannot determine if it has thalassemia from your picture</p>
            )}
          </div>
          {/* <div className='grid grid-cols-2 gap-3'>
            {result && Object.entries(result).map(([key, value]) => (
              <>
                <div>{key}</div>
                <div>{value.toFixed(4)}</div>
              </>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default App
