import cn from 'classnames';
import React, { FC } from 'react';
import InputMask from 'react-input-mask';
import MenuItemContainer from '../MenuItemContainer/MenuItemContainer';

import s from './Input.module.css';

interface IInput {
    description: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    mask?: string;
    error?: string;
}
const Input: FC<IInput> = ({ description, mask, error, ...rest }) => {
    return (
        <MenuItemContainer>
            {mask ? (
                <>
                    <InputMask
                        mask={mask}
                        className={cn(s.input, {[s.error]: !!error})}
                        {...rest}
                    />
                </>
            ) : (
                <input className={s.input} {...rest} />
            )}
            <div className={s.description}>
                {!!error && (
                    <span className={s.errorText}>{error}</span>
                )}
                {description}
            </div>
        </MenuItemContainer>
    );
};

export default Input;
