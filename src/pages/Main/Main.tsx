import cn from 'classnames';
import { FC, ReactNode } from 'react';

import s from './Main.module.css';

interface IMain {
    children?: ReactNode;
    step?: number;
    orderType?: string;
}
const Main: FC<IMain> = ({ children, step, orderType }) => {
    return (
        <div className={cn(s.container, {[s.second]: step === 2, [s.third]: step === 3})}>
            <div className={cn(s.logo, {[s.ribbonLogo]: step === 3 && orderType === 'FREE'})} />
            <div className={s.content}>
                {children}
            </div>
            <div className={s.handsLogo} />
        </div>
    );
};

export default Main;
