import { PlaygroundContext } from './PlaygroundContext'
import { useContext, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { FolderPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
const FileTabs = () => {
    const { selectedFileName, files, setSelectedFileName, setFiles, addFile } = useContext(PlaygroundContext)
    const [fileName, setFileName] = useState('')
    const [open, setOpen] = useState(false)
    const newFile = () => {
        if (!fileName) {
            toast.error('请输入文件名')
            return
        }
        addFile(fileName)
        setOpen(false)
        setFileName('')
        // console.log(fileName)
    }
    return (
        <div className="flex max-w-full overflow-auto justify-between items-center">
            <div className="flex">
                {Object.keys(files)
                    .filter(item => item != 'import-map.json')
                    ?.map(item => {
                        return (
                            <div onClick={() => setSelectedFileName(item)} key={item} className="px-3 border-b-2 cursor-pointer flex">
                                <div
                                    className={cn('border-b-4 border-transparent font-bold pb-2 text-nowrap', {
                                        'border-b-4 border-[#2e97df] text-[#2e97df]': selectedFileName == item
                                    })}>
                                    {item}
                                </div>
                            </div>
                        )
                    })}
                <div onClick={() => setOpen(true)} className=" hover:text-[#2e97df] cursor-pointer ml-1">
                    <FolderPlus />
                </div>
            </div>
            <div className="ml-4 mb-1">
                <div onClick={() => setSelectedFileName('import-map.json')} className="px-3  cursor-pointer flex">
                    <div
                        className={cn('text-sm pb-2 text-nowrap', {
                            'text-[#2e97df]': selectedFileName == 'import-map.json'
                        })}>
                        import-map.json
                    </div>
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>输入文件名称</DialogTitle>
                    </DialogHeader>
                    <Input
                        onChange={e => {
                            setFileName(e.target.value)
                        }}
                        value={fileName}
                        type="email"
                        placeholder="Email"
                    />
                    <DialogFooter>
                        <Button onClick={() => newFile()} type="submit">
                            确定
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default FileTabs
