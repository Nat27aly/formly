export type Question = { id: string; text: string }
export type FormState = {
  title: string
  description: string
  questions: Question[]
}

export type FormBuilderProps = {
  initialData?: FormState
  isEditing?: boolean
  formId?: string
}
