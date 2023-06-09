import type { Ref } from 'vue'
import { z } from 'zod'

import { http } from '@/http'

interface UseFileUpload {
  isUploadingFile: Ref<boolean>
  progress: Ref<number>
  uploadFile: (file: File) => Promise<string>
}

export default (): UseFileUpload => {
  const progress = ref<number>(0)
  const isUploadingFile = ref<boolean>(false)

  const uploadFile = async (file: File): Promise<string> => {
    const { name, type } = file

    const data = await http.post('/admin/media', {
      data: {
        fileName: name,
        mimeType: type,
      },
      requestSchema: z.object({
        fileName: z.string(),
        mimeType: z.string(),
      }),
      responseSchema: z.object({
        id: z.string(),
        url: z.string().url(),
      }),
    })

    const blob = new Blob([file])
    const xhr = new XMLHttpRequest()

    await new Promise<void>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable)
          progress.value = (e.loaded / e.total) * 100
      })

      xhr.addEventListener('loadend', () => {
        if (xhr.readyState === 4 && xhr.status === 200)
          resolve()
        else
          reject(new Error('Upload failed'))
      })

      xhr.open('PUT', data.url, true)
      xhr.setRequestHeader('Content-Type', type)
      xhr.send(blob)
    })

    return data.id
  }

  return {
    isUploadingFile,
    progress,
    uploadFile,
  }
}
