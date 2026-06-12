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
      <div className="quote-card">
        <h1 className="header">Random Quote Generator</h1>
        {isLoading ? (
          <p className="loading-msg"></p>
        ) : (
          <>
            <p className="quote">{quote}</p>
            <p className="author"><strong>{author}</strong></p>
          </>
        )}

        <button className="btn-random"
                onClick={fetchQuote}
        >
          New Quote
        </button>
      </div>
    </div>
  )
}

export default App
