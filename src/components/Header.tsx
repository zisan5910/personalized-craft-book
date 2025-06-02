
import React, { useState } from 'react';
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogTrigger asChild>
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <User size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-0 overflow-hidden">
                <Auth />
              </DialogContent>
            </Dialog>
            
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={18} className="sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-gray-800">Z</span>
              </div>
              <h1 className="text-lg sm:text-xl font-medium text-gray-700">Zpad</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl min-w-0">
            <div className="relative">
              <Search size={16} className="sm:w-5 sm:h-5 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your notes"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-gray-50 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md border-0 rounded-lg transition-all outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onToggleArchived(!showArchived)}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                showArchived ? 'bg-yellow-100 text-yellow-700' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={showArchived ? 'Show active notes' : 'Show archived notes'}
            >
              <Archive size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Zpad',
                    text: 'Check out my notes app!',
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              title="Share"
            >
              <Share size={16} className="sm:w-5 sm:h-5" />
            </button>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
