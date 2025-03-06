// components/DndWrapper.tsx
'use client'; // 标记为客户端组件

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function DndWrapper({ children }: { children: React.ReactNode }) {
    return (
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    );
}