'use server'
 
export async function searchPrompt(formData: FormData) {
  console.log('Searching...',  formData)
  console.log('value: ', formData.get('search'))
}