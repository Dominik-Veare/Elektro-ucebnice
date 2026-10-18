import React, { useState } from 'react';
import { 
  CreditCard, 
  RotateCw, 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Award
} from 'lucide-react';
import { FLASHCARDS } from '../data/flashcards';

export const FlashcardsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('vše');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const STORAGE_KEY = 'elektroucebnice_known_flashcards_v1';

  const [knownCards, setKnownCards] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('elektroucebnice_known_flashcards_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const categories = [
    { id: 'vše', label: 'Všechny kartičky' },
    { id: 'bezpečnost', label: '5 pravidel & BOZP' },
    { id: 'měření', label: 'Revize & měření (Zs, Riso, RCD)' },
    { id: 'normy', label: 'Normy & vypínací časy' },
    { id: 'zapojení', label: 'Zapojení (6, 7, rozvaděč)' },
    { id: 'první-pomoc', label: 'První pomoc & KPR' },
    { id: 'výpočty', label: 'Vzorce a dimenzování' },
  ];

  const filteredCards = selectedCategory === 'vše'
    ? FLASHCARDS
    : FLASHCARDS.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleMarkKnown = (known: boolean) => {
    if (currentCard) {
      setKnownCards(prev => {
        const updated = { ...prev, [currentCard.id]: known };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignorujeme chybu úložiště
        }
        return updated;
      });
      handleNext();
    }
  };

  const knownCount = Object.values(knownCards).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Hlavička */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">Kartičky pro ústní část</h1>
          </div>
          <p className="text-xs text-slate-400 text-pretty leading-relaxed">
            Otázky zkoušejícího, které musíš umět bez váhání odříkat nahlas u zkoušky.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-emerald-400 shrink-0">
          <Award className="w-4 h-4" />
          <span>Naučeno: {knownCount} / {FLASHCARDS.length}</span>
        </div>
      </div>

      {/* Filtry kategorií */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Samotná kartička (Flashcard) */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative min-h-[320px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            {/* Horní info */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80">
              <span className="font-mono uppercase tracking-wider text-amber-400 font-bold">
                Kategorie: {currentCard.category}
              </span>
              <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-amber-400 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Klikni pro otočení</span>
              </div>
            </div>

            {/* Obsah strany A nebo B */}
            <div className="my-auto py-6">
              {!isFlipped ? (
                /* PŘEDNÍ STRANA - Otázka zkoušejícího */
                <div className="space-y-3 text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Otázka zkoušejícího:
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    {currentCard.front}
                  </h2>
                </div>
              ) : (
                /* ZADNÍ STRANA - Správná odpověď v bodech */
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                    Správná odpověď:
                  </span>
                  <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                    {currentCard.back}
                  </div>
                  {currentCard.examNote && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-amber-300 font-medium">
                      ⚠️ {currentCard.examNote}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Spodní lišta kartičky */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-500">
              <span>Kartička {currentIndex + 1} z {filteredCards.length}</span>
              <span className="italic text-slate-400">
                {isFlipped ? 'Zadní strana (odpověď)' : 'Přední strana (otázka)'}
              </span>
            </div>
          </div>

          {/* Tlačítka znám / neznám a navigace */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors shrink-0"
              title="Předchozí kartička"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center max-w-xs">
              <button
                onClick={() => handleMarkKnown(false)}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-500/10 text-red-400 border border-slate-800 hover:border-red-500/30 transition-colors whitespace-nowrap"
              >
                <X className="w-4 h-4 shrink-0" />
                <span>Ještě neumím</span>
              </button>
              <button
                onClick={() => handleMarkKnown(true)}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 whitespace-nowrap"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>Umím!</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors shrink-0"
              title="Další kartička"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
};
