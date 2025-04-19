import { useState, useEffect, useRef } from 'react';
import { Label } from './label';
import { Input } from './input';
import { X, Check, Search } from 'lucide-react';

interface Technology {
  id: number;
  name: string;
  slug: string;
}

interface TechnologySelectProps {
  technologies: Technology[];
  selectedTechnologies: number[];
  onChange: (selectedIds: number[]) => void;
  error?: string;
}

export function TechnologySelect({
  technologies,
  selectedTechnologies,
  onChange,
  error
}: TechnologySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter technologies based on search
  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTechnology = (techId: number) => {
    const newSelection = selectedTechnologies.includes(techId)
      ? selectedTechnologies.filter(id => id !== techId)
      : [...selectedTechnologies, techId];
    onChange(newSelection);
  };

  const removeTechnology = (techId: number) => {
    onChange(selectedTechnologies.filter(id => id !== techId));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Label>Technologies</Label>
      <div className="relative">
        <div
          className={`min-h-[42px] w-full rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer flex flex-wrap gap-1`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedTechnologies.length === 0 ? (
            <span className="text-gray-500">Select technologies...</span>
          ) : (
            selectedTechnologies.map(techId => {
              const tech = technologies.find(t => t.id === techId);
              return tech ? (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-sm"
                >
                  {tech.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTechnology(tech.id);
                    }}
                    className="hover:text-indigo-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null;
            })
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-300">
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search technologies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-auto p-1">
              {filteredTechnologies.length === 0 ? (
                <div className="px-2 py-3 text-sm text-gray-500">No technologies found</div>
              ) : (
                filteredTechnologies.map((tech) => (
                  <div
                    key={tech.id}
                    className={`flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-gray-100 ${
                      selectedTechnologies.includes(tech.id) ? 'bg-indigo-50' : ''
                    }`}
                    onClick={() => toggleTechnology(tech.id)}
                  >
                    <span>{tech.name}</span>
                    {selectedTechnologies.includes(tech.id) && (
                      <Check className="h-4 w-4 text-indigo-600" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}