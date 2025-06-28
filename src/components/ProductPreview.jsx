import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Eye } from 'lucide-react'
import { useProductForm } from '../Context/FormContext'

export default function ProductPreview() {
  const { productForm } = useProductForm()

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {productForm.image && (
            <img src={productForm.image} alt="Product" className="w-full h-48 object-cover" />
          )}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              {productForm.category && (
                <Badge className="bg-blue-100 text-blue-700">{productForm.category}</Badge>
              )}
              {productForm.category && (
                <Badge className="bg-green-100 text-green-700">Available</Badge>
              )}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {productForm.title || 'Product Title'}
            </h3>
            <p className="text-slate-600 mb-4">
              {productForm.description || 'Product description will appear here...'}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {productForm.features?.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {productForm.rating ? (
                  <>
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-slate-600">{productForm.rating}</span>
                  </>
                ) : null}
                {productForm.users && (
                  <>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-slate-600">{productForm.users}</span>
                  </>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-800">
                  {productForm.price || 'Custom pricing'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}