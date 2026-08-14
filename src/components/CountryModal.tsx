import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { CountryInfo } from '../types';
import { COUNTRIES_LIST } from '../data/eventsData';

interface CountryModalProps {
  currentCountry: CountryInfo;
  onSelectCountry: (country: CountryInfo) => void;
  onClose: () => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  currentCountry,
  onSelectCountry,
  onClose,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white text-[#121212] w-full max-w-md rounded-xl shadow-2xl border border-[#bfbfbf] overflow-hidden">
        <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#024ddf]" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Select Region & Currency</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a0a0a0] hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 divide-y divide-[#ebebeb] max-h-96 overflow-y-auto custom-scrollbar">
          {COUNTRIES_LIST.map((c) => {
            const isSelected = currentCountry.code === c.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  onSelectCountry(c);
                  onClose();
                }}
                className={`w-full py-3 px-3 flex items-center justify-between text-left transition-colors rounded ${
                  isSelected ? 'bg-[#024ddf]/10 text-[#024ddf] font-bold' : 'hover:bg-[#f6f6f6] text-[#121212]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-xs text-[#646464] font-mono">
                      Currency: {c.currency} ({c.currencySymbol})
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-[#024ddf]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
