import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { redirect } from 'next/navigation';

const IndexPage = async () => {
    redirect(DEFAULT_LOGIN_REDIRECT);
};

export default IndexPage;
