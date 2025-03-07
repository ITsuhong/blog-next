'use client'

import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import CodeEditor from '@/components/PlayGround/CodeEditor'
import Header from './Header'

import { PlaygroundContext } from './PlaygroundContext'
import { useContext } from 'react'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash-es'
import dynamic from 'next/dynamic'

const Preview = dynamic(() => import('./Preview'), {
    ssr: false // 禁用 SSR
})
export default function ReactPlayground() {
    const { selectedFileName, files, setSelectedFileName, setFiles } = useContext(PlaygroundContext)
    const file = files[selectedFileName]
    function onEditorChange(value?: string) {
        files[file.name].value = value!
        setFiles({ ...files })
    }
    return (
        <div className="h-2/3">
            <Header />
            <div className="h-[800px] w-full">
                <Allotment defaultSizes={[100, 100]}>
                    <Allotment.Pane minSize={0}>
                        <div className="flex max-w-full overflow-auto">
                            {Object.keys(files)?.map(item => {
                                return (
                                    <div onClick={() => setSelectedFileName(item)} key={item} className="px-3 border-b-2 cursor-pointer flex">
                                        <div
                                            className={cn('border-b-4 border-transparent font-bold pb-2 ', {
                                                'border-b-4 border-[#2e97df] text-[#2e97df]': selectedFileName == item
                                            })}>
                                            {item}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <CodeEditor file={files[selectedFileName]} onChange={debounce(onEditorChange, 500)} />
                    </Allotment.Pane>
                    <Allotment.Pane minSize={0}>
                        <Preview />
                    </Allotment.Pane>
                </Allotment>
            </div>
        </div>
    )
}
