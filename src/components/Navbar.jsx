import { useState } from 'react'
import { Button } from './ui/button'
import {
  User, Bell, Settings, LogOut, Users, BarChart3, Menu, X,
  Info, CheckCircle, AlertTriangle, UserCircle, Briefcase, Server
} from 'lucide-react'

export default function Navbar({ onLogout, sidebarCollapsed }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [notifTab, setNotifTab] = useState('unread')
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', time: '2 min ago', type: 'user', read: false, link: '#' },
    { id: 2, message: 'Job application received', time: '10 min ago', type: 'job', read: false, link: '#' },
    { id: 3, message: 'System update scheduled', time: '1 hour ago', type: 'system', read: false, link: '#' },
    { id: 4, message: 'Welcome to Selam Admin!', time: '1 day ago', type: 'info', read: true, link: '#' },
  ])

  const iconMap = {
    user: <UserCircle className="w-8 h-8 text-blue-500 bg-blue-100 rounded-full p-1" />,
    job: <Briefcase className="w-8 h-8 text-blue-500 bg-blue-100 rounded-full p-1" />,
    system: <Server className="w-8 h-8 text-blue-500 bg-blue-100 rounded-full p-1" />,
    info: <Info className="w-8 h-8 text-blue-500 bg-blue-100 rounded-full p-1" />
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleNotifClick = (id, link) => {
    markAsRead(id)
  }

  const filteredNotifications = notifTab === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const unreadCount = notifications.filter(n => !n.read).length
  const timeColor = () => 'text-blue-400'

  const handleLogout = () => {
    if (onLogout) onLogout()
  }

  return (
    <nav className={`
      bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 shadow-sm
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-800 mt-1">Content Management</h2>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[1.2rem] h-5 px-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in">
                  <div className="px-4 pt-2 pb-1 flex items-center justify-between border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Notifications</span>
                    <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline focus:outline-none">Mark all as read</button>
                  </div>
                  <div className="flex px-4 pt-2 gap-2">
                    <button onClick={() => setNotifTab('unread')} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${notifTab === 'unread' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}>Unread {unreadCount > 0 && <span className="ml-1">({unreadCount})</span>}</button>
                    <button onClick={() => setNotifTab('all')} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${notifTab === 'all' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}>All</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto mt-2">
                    {filteredNotifications.length === 0 ? (
                      <div className="px-4 py-12 flex flex-col items-center text-slate-400">
                        <Bell className="w-10 h-10 mb-2 text-slate-200" />
                        <span className="text-center">{notifTab === 'unread' ? "You're all caught up!" : "No notifications yet."}</span>
                      </div>
                    ) : (
                      filteredNotifications.map(n => (
                        <div key={n.id} className={`flex items-start gap-3 px-4 py-4 border-b border-slate-50 last:border-b-0 group transition-all ${!n.read ? 'bg-blue-50/40' : 'bg-white'}`}>
                          <div>{iconMap[n.type] || iconMap['info']}</div>
                          <div className="flex-1 min-w-0">
                            <button onClick={() => handleNotifClick(n.id, n.link)} className="block text-left w-full focus:outline-none">
                              <span className={`block text-sm font-semibold truncate ${!n.read ? 'text-slate-800' : 'text-slate-500'}`}>{n.message}</span>
                              <span className={`block text-xs mt-1 ${timeColor()}`}>{n.time}</span>
                            </button>
                          </div>
                          {!n.read && (
                            <button onClick={() => markAsRead(n.id)} className="ml-2 mt-1 text-blue-500 hover:text-blue-700 transition-colors" title="Mark as read">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-right">
                    <a href="#" className="text-xs text-blue-600 hover:underline font-medium">View All Notifications</a>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Button variant="ghost" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2">
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

          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
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
