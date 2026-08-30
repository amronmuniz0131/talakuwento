import React, {useState} from 'react'
import Makiling from './components/makiling'
import Pinya from './components/pinya'
import Lawa from './components/lawa'
import Makahiya from './components/makahiya'
import Duryan from './components/duryan'
import Makopa from './components/makopa'
import Langgam from './components/langgam'

function Stories() {
  const [story, setStory] = useState('1')

  const storyComponent = () => {
    switch (story) {
      case '1':
        return (
          <Pinya />
        )
      case '2':
        return (
          <Makiling />
        )
      case '3':
        return (
          <Lawa />
        )
      case '4':
        return (
          <Makahiya />
        )
      case '5':
        return (
          <Duryan />
        )
      case '6':
        return (
          <Makopa />
        )
      case '7':
        return (
          <Langgam />
        )
    }
  }

  const previousDay = () => {
    if(story === '1') return
    setStory((Number(story) - 1).toString())
  }
  
  const nextDay = () => {
    if(story === '7') return
    setStory((Number(story) + 1).toString())
  }
  
  return (
    <div className="">
      <div className="flex gap-2">
        <button className="bg-black text-white px-2 py-1 rounded-md" onClick={() => previousDay()}>Previous</button>
      {story}
      <button className="bg-black text-white px-2 py-1 rounded-md" onClick={() => nextDay()}>Next</button>
      </div>
      {storyComponent()}
    </div>
  )
}

export default Stories