'use client'
import { Input } from '@/components/ui/input'
import Upload, { UploadProps } from '@/components/UploadFile'
import { FolderUp } from 'lucide-react'
import { useState } from 'react'
const Page = () => {
    const [action, setActioon] = useState('http://localhost:3334/upload')

    const props: Omit<UploadProps, 'action'> = {
        name: 'file',
        beforeUpload(file: File) {
            if (file.name.includes('1.image')) {
                return false
            }
            return true
        },
        onSuccess(ret: File) {
            console.log('onSuccess', ret)
        },
        onError(err: any) {
            console.log('onError', err)
        },
        onProgress(percentage: any, file: any) {
            console.log('onProgress', percentage)
        },
        onChange(file: any) {
            console.log('onChange', file)
        }
    }
    return (
        <div className="w-full h-full flex  mt-5 flex-col">
            <div className="flex items-center mb-4">
                <div className="text-sm">上传地址:</div>
                <Input className="w-96" value={action} onChange={e => setActioon(e.target.value)}></Input>
            </div>
            <Upload {...props} drag action={action}>
                <div className="p-3">
                    <div className="flex justify-center ">
                        <FolderUp color="#1a6ef7" size={40} />
                    </div>
                    <div className="flex justify-center text-black text-center font-bold mt-5">Click or drag file to this area to upload</div>
                    <div className="flex justify-center text-[#00000073] text-sm text-center mt-2">Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.</div>
                </div>
            </Upload>
        </div>
    )
}
export default Page
