import React from 'react'
import { Handle, useHandleConnections } from '@xyflow/react'

const CustomHandle = props => {
    const connections = useHandleConnections({
        type: props.type
    })

    return <Handle {...props} isConnectable={true} />
}

export default CustomHandle
