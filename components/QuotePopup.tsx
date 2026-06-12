'use client';
import { X, Quote as QuoteIcon } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { fetchQuote } from '@/utils/quoteEngine';
import DraggableWidget from './DraggableWidget';

export default function QuotePopup() {
  const { currentQuote, isQuotePopupOpen, hideQuotePopup, showQuotePopup } = useDashboardStore();

  const handleNextQuote = async () => {
    const q = await fetchQuote();
    showQuotePopup(q);
  };

  if (!isQuotePopupOpen || !currentQuote) return null;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1] w-full pointer-events-none px-2 animate-in slide-in-from-top-10 fade-in duration-500 flex justify-center">
      <DraggableWidget id="quote">
        <div className="relative py-3 px-4 text-white overflow-hidden group text-center drop-shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl w-[50vw]">
          <div
            className="relative z-10 cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto inline-block w-full"
            onClick={handleNextQuote}
            title="Click for another quote"
          >
            <p className="text-lg md:text-xl font-bold tracking-wide leading-relaxed italic text-white/90 break-words whitespace-normal text-wrap">
              "{currentQuote.text}"
            </p>
            <p className="mt-2 text-sm font-semibold tracking-widest text-blue-300 uppercase opacity-80">
              — {currentQuote.author || 'Unknown'}
            </p>
          </div>
        </div>
      </DraggableWidget>
    </div>
  );
}
