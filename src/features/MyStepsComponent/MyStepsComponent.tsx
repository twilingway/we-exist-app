import Main from '../../pages/Main/Main';
import Info from '../../shared/ui/Info/Info';
import Input from '../../shared/ui/Input/Input';
import { ChangeEvent, FC, useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import ErrorStep from '../../shared/ui/ErrorStep/ErrorStep';

import './MyStepsComponent.css';

export type OrderType = 'FREE' | 'CALLBACK' | 'EDUCATION';


export interface IFirstStepData {
    name: string;
    description?: string;
    type?: OrderType;
}

const firstStepData: IFirstStepData[] = [
    {
        name: 'БЕСПЛАТНЫЙ ВЫЗОВ',
        description: 'ДЛЯ УЧАСТНИКОВ СВО',
        type: 'FREE'
    },
    {
        name: 'ВЫЗОВ ПО ЗАПРОСУ',
        description: 'ДЛЯ ГРАЖДАНСКИХ ЛИЦ',
        type: 'CALLBACK'
    },
    {
        name: 'ОБУЧЕНИЕ ★',
        description: 'ДЛЯ ПСИХОЛОГОВ',
        type: 'EDUCATION'
    },
];

const MyStepsComponent: FC = () => {
    const [step, setStep] = useState(1);
    const [orderType, setOrderType] = useState<OrderType>('FREE');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const isPhoneValid = () =>
        !RegExp(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/).exec(phone) ? 'Введите корректный номер телефона' : '';

    const handleButtonClick = (buttonType?: OrderType) => {
        setOrderType(buttonType ?? 'FREE');
        setStep(2);
    };

    const handleToMainClick = () => {
        setOrderType('FREE');
        setStep(1);
    };

    const handleSubmit = async () => {
        const response = await fetch('localhost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ orderType, address, phone, name }),
        });

        if (response.ok) {
            // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            const json = await response.json();
            console.log('response json :>> ', json);
            setStep(3);
        } else {
            alert('Ошибка HTTP: ' + response.status);
            setStep(0);
        }
    };

    const handleAddressChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setAddress(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    return (
        <Main step={step} orderType={orderType}>
            {step === 0 && <ErrorStep onClick={handleToMainClick} />}
            {step === 1 &&
                firstStepData.map((el) => (
                    <Button step={step} key={el.type} onClick={handleButtonClick} {...el}/>
                ))
            }
            {step === 2 &&
                <>
                    <Input
                        type="text"
                        placeholder="ВВЕДИТЕ ВАШ АДРЕС"
                        description="ПРИМЕР: МОСКВА, УЛ. СТРОИТЕЛЕЙ, ДОМ 5, ПОДЪЕЗД 4"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="ВВЕДИТЕ НОМЕР ТЕЛЕФОНА"
                        description="ПРИМЕР: +7912 617 27 14"
                        value={phone}
                        onChange={handlePhoneChange}
                        mask="+7 (999) 999-99-99"
                        error={phone && isPhoneValid()}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="ВВЕДИТЕ ВАШЕ ИМЯ"
                        description="*КАК БЫ ВЫ ХОТЕЛИ, ЧТОБЫ К ВАМ ОБРАЩАЛИСЬ"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <Button
                        name="ОТПРАВИТЬ ЗАЯВКУ"
                        step={step}
                        onClick={handleSubmit}
                        disabled={!!isPhoneValid()}
                    />
                </>
            }
            {step === 3 &&
                <>
                    <Info text="ВАША ЗАЯВКА ПРИНЯТА!" description="МЫ СКОРО СВЯЖЕМСЯ С ВАМИ!" />
                    <Button step={step} onClick={handleToMainClick} name="НОВАЯ ЗАЯВКА" />
                </>
            }
        </Main>
    );
};

export default MyStepsComponent;
