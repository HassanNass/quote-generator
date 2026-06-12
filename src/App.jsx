import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function fetchQuote() {
    try{
      setIsLoading(true)
      const response = await fetch(`https://dummyjson.com/quotes/random`)
      const data = await response.json()
      setQuote(data.quote)
      setAuthor(data.author)
      setIsLoading(false)
    }
    catch{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
    const interval = setInterval(() => {
      fetchQuote()
    }, 10000)

    return () => clearInterval(interval)
  }, [])
  
  return(
    <div className="container">
      <h1 className="header">Random Quote Generator</h1>
      <p className="quote">{quote}</p>
      <p className="author"><strong>{author}</strong></p>
      {isLoading && <p className="loading-masg">Loading...</p>}
      <button className="btn-random"
              onClick={fetchQuote}
      >Generate</button>
    </div>
  )
}

export default App
