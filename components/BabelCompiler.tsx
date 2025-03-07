// components/BabelCompiler.tsx
'use client'; // 标记为客户端组件

import { useState } from 'react';
import { transform } from '@babel/standalone';

export default function BabelCompiler() {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [error, setError] = useState('');

    const handleCompile = () => {
        try {
            // 使用 Babel 编译代码
            const result:any = transform(inputCode, {
                presets: ['es2015', 'react'],
            });
            setOutputCode(result.code);
            setError('');
        } catch (err:any) {
            setError(err.message);
            setOutputCode('');
        }
    };

    return (
        <div>
            <h1>Babel Compiler</h1>
            <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter your JavaScript code here"
                rows={10}
                cols={50}
            />
            <br />
            <button onClick={handleCompile}>Compile</button>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {outputCode && (
                <div>
                    <h2>Compiled Code:</h2>
                    <pre>{outputCode}</pre>
                </div>
            )}
        </div>
    );
}