
import React, { useState } from 'react';
import { User, Settings, LogOut, Shield, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const UserMenu = () => {
  const { currentUser, userProfile, signOut, verifyEmail } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail();
      alert('Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  if (!currentUser || !userProfile) return null;

  return (
    <Sheet open={showProfile} onOpenChange={setShowProfile}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={userProfile.displayName}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <User size={14} className="sm:w-4 sm:h-4 text-gray-800" />
            </div>
          )}
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Account Settings</SheetTitle>
          <SheetDescription>
            Manage your Zpad account and preferences
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-3">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={userProfile.displayName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-800" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">{userProfile.displayName}</h3>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
          </div>

          {!currentUser.emailVerified && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Email not verified</span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Please verify your email address to secure your account.
              </p>
              <Button
                onClick={handleVerifyEmail}
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <Mail size={14} className="mr-2" />
                Send verification email
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Theme</span>
              <span className="text-sm text-gray-900 capitalize">{userProfile.theme}</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Email notifications</span>
              <span className="text-sm text-gray-900">
                {userProfile.notificationSettings.emailNotifications ? 'On' : 'Off'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Member since</span>
              <span className="text-sm text-gray-900">
                {userProfile.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;
