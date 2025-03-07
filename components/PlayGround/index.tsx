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
import FileTabs from './FileTabs'

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
                        <FileTabs />
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
