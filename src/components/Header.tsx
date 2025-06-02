
import React, { useState, useCallback } from 'react';
import { Search, Menu, Archive, Share, User } from 'lucide-react';
import UserMenu from './UserMenu';
import Auth from './Auth';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './ui/dialog';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showArchived: boolean;
  onToggleArchived: (show: boolean) => void;
}

const Header = ({ searchTerm, onSearchChange, showArchived, onToggleArchived }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'Zpad - Smart Note Taking',
        text: 'Check out this amazing note-taking app!',
        url: window.location.href,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const handleToggleArchived = useCallback(() => {
    onToggleArchived(!showArchived);
  }, [showArchived, onToggleArchived]);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogTrigger asChild>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
                  aria-label="Authentication"
                >
                  <User size={20} className="text-gray-600" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-0 overflow-hidden border-0 shadow-2xl">
                <Auth />
              </DialogContent>
            </Dialog>
            
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
              aria-label="Menu"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">Z</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Zpad</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your notes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md border-0 rounded-xl transition-all outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleArchived}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-105 ${
                showArchived 
                  ? 'bg-yellow-100 text-yellow-700 shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={showArchived ? 'Show active notes' : 'Show archived notes'}
              aria-label={showArchived ? 'Show active notes' : 'Show archived notes'}
            >
              <Archive size={18} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 text-gray-600"
              title="Share Zpad"
              aria-label="Share"
            >
              <Share size={18} />
            </button>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
