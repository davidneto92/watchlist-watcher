import axios from 'axios'

// can we get the real type?
export async function queryPage(URL: string): Promise<any> {
  const response = await axios.get(URL)
  return response.data
}
