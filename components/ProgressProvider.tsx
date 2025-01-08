'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
type Props = { children?: React.ReactNode; };

const ProgressProvider = ({ children }: Props) => {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                color="#7db1f8"
                options={{ showSpinner: true }}
                shallowRouting
            />
        </>
    );
};

export default ProgressProvider;
