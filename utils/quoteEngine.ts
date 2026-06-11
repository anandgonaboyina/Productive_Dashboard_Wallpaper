import fallbackQuotes from './quotes.json';

export interface Quote {
  text: string;
  author: string;
}

let recentIndices: number[] = [];

export async function fetchQuote(): Promise<Quote> {
  try {
    // Attempt to fetch from DummyJSON API (highly reliable and free)
    const res = await fetch('https://dummyjson.com/quotes/random', { 
      cache: 'no-store',
      // Short timeout so we don't hang the UI if it's down
      signal: AbortSignal.timeout(3000) 
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data && data.quote) {
        return { text: data.quote, author: data.author };
      }
    }
  } catch (err) {
    console.warn('Quote API failed, falling back to local JSON dataset');
  }

  // Fallback to our robust local JSON
  let randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  
  // Prevent repetitions for the last 20 quotes (or half the array, whichever is smaller)
  const maxRecent = Math.min(20, Math.floor(fallbackQuotes.length / 2));
  
  let attempts = 0;
  while (recentIndices.includes(randomIndex) && attempts < 10) {
    randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    attempts++;
  }
  
  recentIndices.push(randomIndex);
  if (recentIndices.length > maxRecent) {
    recentIndices.shift(); // Remove oldest
  }

  // type.fit format is { text: string, author: string }
  const q = fallbackQuotes[randomIndex] as { text: string; author: string | null };
  
  return {
    text: q.text || 'Keep pushing forward.',
    // Clean up type.fit suffix bug
    author: (q.author || 'Unknown').replace(', type.fit', ''), 
  };
}
