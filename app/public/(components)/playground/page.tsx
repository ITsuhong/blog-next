'use client'
import { PlaygroundProvider } from '@/components/PlayGround/PlaygroundProvider'
import PlayGround from '@/components/PlayGround'

export default function Page() {
    return (
        <div>
            <PlaygroundProvider>
                <PlayGround />
            </PlaygroundProvider>
        </div>
    )
}
