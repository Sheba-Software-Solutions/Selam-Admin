import { Menu, X, Package, Briefcase, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, cloneElement } from 'react'

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, onLogout }) {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navItems = [
    { label: 'Products', value: 'products', icon: <Package /> },
    { label: 'Jobs', value: 'jobs', icon: <Briefcase /> },
  ]

  const handleLogout = () => {
    if (onLogout) onLogout()
  }

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/90 shadow-md"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`
          fixed z-50 left-0 top-0 h-screen w-${collapsed ? '20' : '64'} bg-white/60 backdrop-blur-lg border-r border-slate-200/40
          flex flex-col transition-all duration-300 ease-in-out shadow-2xl
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block
        `}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full p-6 space-y-6">
          {/* Selam Admin Branding */}
          <div className={`flex items-center space-x-3 mb-6 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-slate-800">Selam Admin</h1>
                <p className="text-xs text-slate-500">Dashboard</p>
              </div>
            )}
          </div>
          <nav className="flex-1 space-y-1 text-sm">
            {navItems.map((item) => {
              const isActive = activeTab === item.value
              const iconColor = isActive ? 'text-blue-700' : 'text-slate-500'
              return (
                <button
                  key={item.value}
                  className={`relative flex items-center gap-3 px-4 py-2 w-full rounded-lg text-left font-normal transition-all duration-200 ${collapsed ? 'justify-center' : 'justify-start'}
                    ${isActive
                      ? 'bg-blue-100/80 font-semibold before:content-[" "] before:w-1 before:h-6 before:bg-blue-600 before:absolute before:left-0 before:rounded-l-lg shadow-md'
                      : 'hover:bg-blue-50/60'}
                  `}
                  onClick={() => {
                    setActiveTab(item.value)
                    setOpen(false)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  {cloneElement(item.icon, { className: `w-5 h-5 ${iconColor}` })}
                  {!collapsed && <span className={`text-sm ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>{item.label}</span>}
                </button>
              )
            })}
          </nav>
          <div className="relative mt-auto">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-lg text-left hover:bg-slate-100/80 transition-colors ${collapsed ? 'justify-center' : 'justify-start'} text-slate-500`}
              title={collapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 text-slate-500" />
              {!collapsed && <span className="text-sm">Logout</span>}
            </button>
          </div>
          <button
            className="mt-8 flex items-center justify-center w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}