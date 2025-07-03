import { FormProvider } from './Context/FormContext'
import Navbar from './components/Navbar'
import ProductForm from './components/ProductForm'
import ProductPreview from './components/ProductPreview'
import JobForm from './components/JobForm'
import JobPreview from './components/JobPreview'
import Sidebar from './components/Sidebar'
import { useState } from 'react'
import { Plus } from 'lucide-react'

function App({ onLogout }) {
  const [activeTab, setActiveTab] = useState('products')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Determine grid columns based on sidebar state
  const gridCols = sidebarCollapsed ? 'md:grid-cols-2' : 'md:grid-cols-1'

  return (
    <FormProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar onLogout={onLogout} sidebarCollapsed={sidebarCollapsed} />
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 flex flex-row items-start gap-8">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} onLogout={onLogout} />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-56'}`}>
            <div className={`grid grid-cols-1 ${gridCols} gap-8 animate-fade-in`}>
              {activeTab === 'products' && (
                <>
                  <section className="min-h-[520px] flex flex-col justify-between bg-white/60 backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-slate-200/30 transition-all duration-300">
                    <ProductForm />
                  </section>
                  <section className="min-h-[520px] flex flex-col justify-between bg-white/60 backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-slate-200/30 transition-all duration-300">
                    <ProductPreview />
                  </section>
                </>
              )}
              {activeTab === 'jobs' && (
                <>
                  <section className="min-h-[520px] flex flex-col justify-between bg-white/60 backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-slate-200/30 transition-all duration-300">
                    <JobForm />
                  </section>
                  <section className="min-h-[520px] flex flex-col justify-between bg-white/60 backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-slate-200/30 transition-all duration-300">
                    <JobPreview />
                  </section>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </FormProvider>
  )
}

export default App