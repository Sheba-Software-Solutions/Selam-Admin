import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectItem } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useToast } from './ui/use-toast'
import { Plus, Upload, Save } from 'lucide-react'
import { useProductForm } from '../Context/FormContext'

export default function ProductForm() {
  const { toast } = useToast()
  const { productForm, setProductForm } = useProductForm()
  const [dragActive, setDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProductForm((prev) => ({ ...prev, image: e.target?.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: 'Success!',
      description: 'Product created successfully.',
    })
    setIsLoading(false)
    setProductForm({
      title: '',
      description: '',
      price: '',
      category: '',
      features: [],
      rating: 0,
      users: '',
      image: '',
    })
  }

  const addFeature = () => {
    const newFeature = document.getElementById('new-feature')?.value
    if (newFeature && !productForm.features?.includes(newFeature)) {
      setProductForm((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature],
      }))
      document.getElementById('new-feature').value = ''
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-md border-slate-200/30 shadow-xl rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-t-2xl py-5">
        <CardTitle className="flex items-center space-x-3 text-lg font-semibold">
          <Plus className="w-6 h-6" />
          <span>Create Product</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Product Title</label>
            <Input
              value={productForm.title}
              onChange={(e) => setProductForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter product title"
              className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Category</label>
            <Select
              value={productForm.category}
              onValueChange={(value) => setProductForm((prev) => ({ ...prev, category: value }))}
            >
              <SelectItem value="" disabled>Select category</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </Select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Description</label>
          <Textarea
            value={productForm.description}
            onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Enter product description"
            rows={4}
            className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Price</label>
            <Input
              value={productForm.price}
              onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="$299/month"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Rating</label>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={productForm.rating}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, rating: parseFloat(e.target.value) }))
              }
              placeholder="4.8"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Users</label>
            <Input
              value={productForm.users}
              onChange={(e) => setProductForm((prev) => ({ ...prev, users: e.target.value }))}
              placeholder="500+ users"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Features</label>
          <div className="flex space-x-3 mb-3">
            <Input
              id="new-feature"
              placeholder="Add a feature"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && addFeature()}
            />
            <Button onClick={addFeature} size="sm" className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-6 py-3 transition-all duration-300">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {productForm.features?.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 font-medium py-1 px-3 rounded-full">
                {feature}
                <button
                  onClick={() =>
                    setProductForm((prev) => ({
                      ...prev,
                      features: prev.features?.filter((_, i) => i !== index),
                    }))
                  }
                  className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Product Image</label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive ? 'border-blue-600 bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-14 w-14 text-slate-500 mb-4" />
            <p className="text-slate-700 mb-3 font-medium">Drag and drop an image here, or click to select</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg px-6 py-3 transition-all duration-300"
            >
              Choose File
            </Button>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-lg py-3 font-semibold text-sm transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Save className="w-5 h-5" />
              <span>Create Product</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}