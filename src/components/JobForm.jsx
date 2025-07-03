import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectItem } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useToast } from './ui/use-toast'
import { Plus, Save } from 'lucide-react'
import { useJobForm } from '../Context/FormContext'

export default function JobForm() {
  const { toast } = useToast()
  const { jobForm, setJobForm } = useJobForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: 'Success!',
      description: 'Job created successfully.',
    })
    setIsLoading(false)
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: '',
      experience: '',
      salary: '',
      description: '',
      requirements: [],
    })
  }

  const addRequirement = () => {
    const newReq = document.getElementById('new-requirement')?.value
    if (newReq && !jobForm.requirements?.includes(newReq)) {
      setJobForm((prev) => ({
        ...prev,
        requirements: [...(prev.requirements || []), newReq],
      }))
      document.getElementById('new-requirement').value = ''
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-md border-slate-200/30 shadow-xl rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-2xl py-5">
        <CardTitle className="flex items-center space-x-3 text-lg font-semibold">
          <Plus className="w-6 h-6" />
          <span>Create Job Posting</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Job Title</label>
          <Input
            value={jobForm.title}
            onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., UI/UX Designer"
            className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Department</label>
            <Select
              value={jobForm.department}
              onValueChange={(value) => setJobForm((prev) => ({ ...prev, department: value }))}
            >
              <SelectItem value="" disabled>Select department</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Location</label>
            <Input
              value={jobForm.location}
              onChange={(e) => setJobForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Addis Ababa, Ethiopia"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Job Type</label>
            <Select
              value={jobForm.type}
              onValueChange={(value) => setJobForm((prev) => ({ ...prev, type: value }))}
            >
              <SelectItem value="" disabled>Select type</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Experience</label>
            <Input
              value={jobForm.experience}
              onChange={(e) => setJobForm((prev) => ({ ...prev, experience: e.target.value }))}
              placeholder="e.g., 3+ years"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Salary Range</label>
          <Input
            value={jobForm.salary}
            onChange={(e) => setJobForm((prev) => ({ ...prev, salary: e.target.value }))}
            placeholder="e.g., $30,000 - $45,000"
            className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Job Description</label>
          <Textarea
            value={jobForm.description}
            onChange={(e) => setJobForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Enter job description"
            rows={4}
            className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2 tracking-wide">Requirements</label>
          <div className="flex space-x-3 mb-3">
            <Input
              id="new-requirement"
              placeholder="Add a requirement"
              className="w-full border-slate-300 focus:border-blue-600 rounded-lg py-3 text-sm transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
            />
            <Button onClick={addRequirement} size="sm" className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-6 py-3 transition-all duration-300">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobForm.requirements?.map((req, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 font-medium py-1 px-3 rounded-full">
                {req}
                <button
                  onClick={() =>
                    setJobForm((prev) => ({
                      ...prev,
                      requirements: prev.requirements?.filter((_, i) => i !== index),
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
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white rounded-lg py-3 font-semibold text-sm transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Save className="w-5 h-5" />
              <span>Create Job</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}