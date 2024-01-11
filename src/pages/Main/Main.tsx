import { FC, ReactNode, useMemo } from 'react';
import handsLogo from '../../assets/handsLogo.svg';
import cn from 'classnames';
import smallLogo from '../../assets/smallLogo.svg';
import ribbonLogo from '../../assets/ribbonLogo.png';

import s from './Main.module.css';

interface IMain {
    children?: ReactNode;
    step?: number;
    orderType?: string;
}
const Main: FC<IMain> = ({ children, step, orderType }) => {
    const logo = useMemo(() => step === 3 && orderType === 'social' ? ribbonLogo : smallLogo, [orderType, step])
    return (
        <div className={cn(s.container, {[s.second]: step === 2, [s.third]: step === 3})}>
            <div className={s.logo}>
                <img src={logo} alt="" />
            </div>
            <div className={s.content}>
                {children}
            </div>
            <div className={s.handsLogo}>
                <img src={handsLogo} alt="" />
            </div>
        </div>
    );
};

export default Main;
