import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Search, Check } from "lucide-react";
import { useState, useMemo } from "react";

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", region: "North America" },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "North America" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe" },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe" },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe" },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", region: "Europe" },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", region: "Oceania" },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia" },
  { code: "CN", name: "China", flag: "🇨🇳", region: "Asia" },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", region: "South America" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", region: "South America" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "North America" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East" },
];

interface CountrySelectionProps {
  selectedCountry: string;
  onCountrySelect: (countryCode: string) => void;
  onNext: () => void;
}

export function CountrySelection({ selectedCountry, onCountrySelect, onNext }: CountrySelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

  const regions = Array.from(new Set(countries.map((c) => c.region)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4 shadow-lg"
        >
          <Globe className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Select Your Country</h2>
        <p className="text-foreground/80">Choose your location to personalize your learning experience</p>
      </div>

      {/* Country Dropdown */}
      <div className="relative mb-8">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-xl backdrop-blur-md bg-slate-900/60 border border-white/10 flex items-center justify-between shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3">
            {selectedCountryData ? (
              <>
                <span className="text-3xl">{selectedCountryData.flag}</span>
                <div className="text-left">
                  <p className="font-semibold text-white">{selectedCountryData.name}</p>
                  <p className="text-sm text-foreground/60">{selectedCountryData.region}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 text-foreground/60">
                <Globe className="w-5 h-5" />
                <span>Select your country</span>
              </div>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-foreground/60" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-50"
            >
              <div className="backdrop-blur-xl rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-foreground/50 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Region Quick Select */}
                {!searchQuery && (
                  <div className="p-4 border-b border-white/10">
                    <p className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">Quick Select by Region</p>
                    <div className="flex flex-wrap gap-2">
                      {regions.map((region) => (
                        <motion.button
                          key={region}
                          onClick={() => setHighlightedRegion(region === highlightedRegion ? null : region)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            highlightedRegion === region
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'bg-slate-800/50 text-foreground/80 hover:bg-slate-700/50'
                          }`}
                        >
                          {region}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Country List */}
                <div className="max-h-64 overflow-y-auto p-2">
                  {filteredCountries.map((country) => {
                    const isSelected = country.code === selectedCountry;
                    const isHighlighted = !highlightedRegion || country.region === highlightedRegion;
                    
                    if (!isHighlighted) return null;

                    return (
                      <motion.button
                        key={country.code}
                        onClick={() => {
                          onCountrySelect(country.code);
                          setIsOpen(false);
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-3 rounded-lg flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50'
                            : 'hover:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div className="text-left">
                            <p className="font-medium text-white">{country.name}</p>
                            <p className="text-xs text-foreground/60">{country.region}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2D Map Visualization */}
      <div className="mb-8 p-6 rounded-xl backdrop-blur-md bg-slate-900/60 border border-white/10">
        <div className="relative h-48 flex items-center justify-center">
          {/* Simplified 2D World Map */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="800" height="400" fill="url(#grid)" />

            {/* Continents (simplified) */}
            <motion.path
              d="M 150 100 Q 200 80 250 100 Q 300 120 280 180 Q 260 240 200 220 Q 140 200 150 100"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="2"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.path
              d="M 350 80 Q 400 60 450 80 Q 500 100 480 150 Q 460 200 400 180 Q 340 160 350 80"
              fill="rgba(168, 85, 247, 0.2)"
              stroke="rgba(168, 85, 247, 0.5)"
              strokeWidth="2"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path
              d="M 500 120 Q 550 100 600 120 Q 650 140 630 200 Q 610 260 550 240 Q 490 220 500 120"
              fill="rgba(236, 72, 153, 0.2)"
              stroke="rgba(236, 72, 153, 0.5)"
              strokeWidth="2"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.path
              d="M 600 250 Q 650 230 700 250 Q 750 270 730 320 Q 710 370 650 350 Q 590 330 600 250"
              fill="rgba(34, 197, 94, 0.2)"
              stroke="rgba(34, 197, 94, 0.5)"
              strokeWidth="2"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            {/* Selected country marker */}
            {selectedCountryData && (
              <motion.circle
                cx="400"
                cy="200"
                r="8"
                fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </motion.circle>
            )}
          </svg>

          {/* Selected country overlay */}
          {selectedCountryData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-4 left-4 p-3 rounded-lg backdrop-blur-md bg-slate-900/80 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCountryData.flag}</span>
                <span className="text-sm font-medium text-white">{selectedCountryData.name}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        onClick={onNext}
        disabled={!selectedCountry}
        whileHover={{ scale: selectedCountry ? 1.05 : 1 }}
        whileTap={{ scale: selectedCountry ? 0.95 : 1 }}
        className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${
          selectedCountry
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
            : 'bg-slate-800/50 text-foreground/50 cursor-not-allowed'
        }`}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
