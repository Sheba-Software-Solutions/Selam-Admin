import { FormProvider } from './Context/FormContext'
import Navbar from './components/Navbar'
import ProductForm from './components/ProductForm'
import ProductPreview from './components/ProductPreview'
import JobForm from './components/JobForm'
import JobPreview from './components/JobPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Plus } from 'lucide-react'
import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('products')

  return (
    <FormProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Content Management</h2>
            <p className="text-slate-600">Create and manage products and job postings</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="products" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Jobs</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8">
                <ProductForm />
                <ProductPreview />
              </div>
            </TabsContent>
            <TabsContent value="jobs" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8">
                <JobForm />
                <JobPreview />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </FormProvider>
  )
}

export default App