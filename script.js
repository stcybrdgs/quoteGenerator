/* 
    TODO:
    Use ZenQuotes API:
    - set up node.js BE
    - set up SSH key for ZenQuotes API
    - call ZenQuotes from BE
    - refresh BE cache with new content every hour or so
    const apiUrl = 'https://zenquotes.io/api/quotes'
*/

const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
let apiQuotes = []

const quoteContainer = document.getElementById('quote-card')
const quoteText = document.getElementById('quote-text')
const authorText = document.getElementById('author-text')
const twitterBtn = document.getElementById('twitter-btn')
const newQuoteBtn = document.getElementById('new-quote-btn')
const loader = document.getElementById('loader')

// Show Spinner
function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hide Spinner
function hideLoadingSpinner() {
  loader.hidden = true
  quoteContainer.hidden = false
}

function setNewQuote() {
  showLoadingSpinner() // show the spinner

  // get a random quote from the apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  // tweak styling for long quotes
  if (quote.text.length > 75) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

  // replace quote and author text with new values
  quoteText.textContent = !quote.text ? 'No quote found' : quote.text
  authorText.textContent = !quote.author ? 'Unknown' : quote.author

  hideLoadingSpinner() // hide the spinner
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

async function getQuotes(apiUrl) {
  showLoadingSpinner() // show the spinner

  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    setNewQuote()
  } catch (error) {
    console.log('Error:', error)
  }
}

// event listeners
newQuoteBtn.addEventListener('click', setNewQuote)
twitterBtn.addEventListener('click', tweetQuote)

// on load
getQuotes(apiUrl)

