import { createContext, useContext, useState } from 'react'

const ProductFormContext = createContext()
const JobFormContext = createContext()

export function FormProvider({ children }) {
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    features: [],
    rating: 0,
    users: '',
    image: '',
  })
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: '',
    requirements: [],
  })

  return (
    <ProductFormContext.Provider value={{ productForm, setProductForm }}>
      <JobFormContext.Provider value={{ jobForm, setJobForm }}>
        {children}
      </JobFormContext.Provider>
    </ProductFormContext.Provider>
  )
}

export const useProductForm = () => useContext(ProductFormContext)
export const useJobForm = () => useContext(JobFormContext)