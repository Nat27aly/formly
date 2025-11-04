import FormBuilder from '@/components/forms/form-builder'

export default function createFormPage() {
  return (
    <div className='max-w-3xl max-auto'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Create new form</h1>
        <p className='text-gray-500 mt-2'>Design your custom form.</p>
      </div>

      <FormBuilder />
    </div>
  )
}
