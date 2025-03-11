import { DEFAULT_AUTH_REDIRECT } from '@/routes'
import { redirect } from 'next/navigation'

const IndexPage = async () => {
    redirect(DEFAULT_AUTH_REDIRECT)
}

export default IndexPage
