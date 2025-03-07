import Image from 'next/image'
const Header = () => {
    return (
        <div className="flex items-center border-b-2 mb-3 pb-2">
            <Image className="rounded-md object-fill" alt="" src="https://img-saas-su.oss-cn-beijing.aliyuncs.com/blog/vscode.png" width={30} height={30}></Image>
            <div className="font-semibold ml-3">REACT编辑器</div>
        </div>
    )
}
export default Header
