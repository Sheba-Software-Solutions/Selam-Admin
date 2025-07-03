import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Eye } from 'lucide-react'
import { useJobForm } from '../Context/FormContext'

export default function JobPreview() {
  const { jobForm } = useJobForm()

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-600 font-medium">Available</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              ${jobForm.salary || '$30,000 - $45,000'}
            </Badge>
            <span className="text-sm text-slate-500">Posted 1 week ago</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {jobForm.title || 'Job Title'}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center space-x-1">
              <span>📋</span>
              <span>{jobForm.department || 'Department'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📍</span>
              <span>{jobForm.location || 'Location'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⏰</span>
              <span>{jobForm.type || 'Full-time'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🎯</span>
              <span>{jobForm.experience || '3+ years'}</span>
            </div>
          </div>
          <p className="text-slate-600 mb-4">
            {jobForm.description || 'Job description will appear here...'}
          </p>
          {jobForm.requirements && jobForm.requirements.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Requirements:</h4>
              <ul className="space-y-1">
                {jobForm.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-slate-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex space-x-3 mt-6">
            <Button className="bg-slate-800 hover:bg-slate-900 text-white">
              Apply Now
            </Button>
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              Save Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}