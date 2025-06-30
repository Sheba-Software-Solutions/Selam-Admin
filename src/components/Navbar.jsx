import { useState } from 'react'
import { Button } from './ui/button'
import { User, Bell, Settings, LogOut, Users, BarChart3, Menu, X } from 'lucide-react'

export default function Navbar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    if (onLogout) onLogout()
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Selam Admin</h1>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 hover:bg-blue-50"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Tools</span>
              </Button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 transition-colors">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>Manage Users</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 transition-colors">
                    <BarChart3 className="w-4 h-4 text-slate-500" />
                    <span>Reports</span>
                  </a>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block">Admin</span>
              </Button>
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 transition-colors">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </a>
                  <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 transition-colors text-red-600 w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Manage Users</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Reports</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell className="w-4 h-4 text-slate-500" />
              <span>Notifications</span>
            </a>
            <hr className="border-slate-200" />
            <button onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg transition-colors text-red-600 w-full text-left">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}