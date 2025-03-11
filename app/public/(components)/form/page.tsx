'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import Form from '@/components/Form/index'
import { useEffect, useRef } from 'react'
import { FormRefApi } from '@/components/Form/Form'

const Basic = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const form = useRef<FormRefApi>(null)

    return (
        <div className="p-6">
            <Button
                className="mr-3 mb-4"
                onClick={() => {
                    console.log(form.current?.getFieldsValue())
                }}>
                打印表单值
            </Button>

            <Button
                onClick={() => {
                    form.current?.setFieldsValue({
                        username: '李四',
                        password: '123456'
                    })
                }}>
                设置表单值
            </Button>

            <Form ref={form} initialValues={{ username: '这是初始值' }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名!' },
                        { max: 6, message: '长度不能大于 6' }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                    <Textarea placeholder="请输入密码" />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="text-white">记住我</Checkbox>
                </Form.Item> */}

                <Form.Item name="">
                    <div>
                        <Button>登录</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Basic
