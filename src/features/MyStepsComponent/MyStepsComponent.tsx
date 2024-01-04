import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './MyStepsComponent.css'; // Импорт CSS файла

type OrderType = 'social' | 'psychologist' | 'tour';

const MyStepsComponent: React.FC = () => {
    const [step, setStep] = useState(1);
    const [orderType, setOrderType] = useState<OrderType>('social');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const isPhoneValid = () => phone.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/);

    const handleButtonClick = (buttonType: OrderType) => {
        setOrderType(buttonType);
        setStep(2);
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

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAddress(event.target.value);
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <div className="steps-container">
            {step === 0 && (
                <>
                    <div>Во время отправки заявки произошла ошибка</div>
                    <button className="step-button" onClick={() => setStep(1)}>
                        Попробовать снова
                    </button>
                </>
            )}
            {step > 1 && (
                <button
                    className="step-button"
                    onClick={() => setStep((prev) => prev - 1)}
                >
                    Назад
                </button>
            )}
            {step === 1 && (
                <div className="step">
                    <div className="title">МЫ-ЕСТЬ!</div>
                    <button
                        className="first-button"
                        onClick={() => handleButtonClick('social')}
                    >
                        <div className="leftIcon1">911</div>
                        <div className="text1">ПОЕЗДКА С ПСИХОЛОГОМ</div>
                    </button>
                    <button
                        className="second-button"
                        onClick={() => handleButtonClick('psychologist')}
                    >
                        <div className="leftIcon2">SOS</div>
                        <div className="text2">ДЛЯ УЧАСТНИКОВ СВО</div>
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="step">
                    <div className="input-group">
                        <label>Адрес:</label>
                        <input
                            type="text"
                            placeholder="Введите адрес откуда Вас забрать"
                            value={address}
                            onChange={handleChangeAddress}
                            required
                        />
                        <small>
                            Пример: Москва, ул. Строителей, дом 4, под. 3
                        </small>
                    </div>
                    <div className="input-group">
                        <label>Телефон:</label>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Указать номер телефона для связи"
                            className={isPhoneValid() ? 'valid' : 'invalid'}
                        />
                        {!isPhoneValid() && (
                            <small>Введите корректный номер телефона</small>
                        )}
                    </div>
                    <div className="input-group">
                        <label>Имя:</label>
                        <input
                            type="text"
                            placeholder="Введите ваше имя (необязательно)"
                            value={name}
                            onChange={handleChangeName}
                        />
                    </div>
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={isPhoneValid() ? false : true}
                    >
                        Подтвердить
                    </button>
                </div>
            )}
            {step === 3 && (
                <div className="step">
                    <div>
                        Ваша заявка успешно зарегистрированна. Ожидайте звонок
                        специалиста.
                    </div>
                    <button
                        className="submit-button"
                        onClick={() => setStep(1)}
                    >
                        Подать еще 1 заявку
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyStepsComponent;
