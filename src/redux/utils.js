export const validation = {

    required: (value) => value ? undefined : 'Обязательное для заполнения поле',
    email: (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Некорректный адрес электронной почты' : undefined,
    // phone: (value) => value && !/^\+7\s?[(]{0,1}9[0-9]{2}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/i.test(value) ? 'Укажите номер телефона в формате +7(ХХХ)XXX-XX-XX' : undefined,
    phone: (max) => value => value.toString().length && value.toString().length < max ? 'Некорректный номер телефона' : undefined,
    maxValue: (max) => value => parseInt(value.replace(/\s/g, '')) && parseInt(value.replace(/\s/g, '')) > max ? `Сумма должна быть не больше ${max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.` : undefined,
    minValue: (min) => value => parseInt(value.replace(/\s/g, '')) && parseInt(value.replace(/\s/g, '')) < min ? `Сумма должна быть не меньше ${min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.` : undefined,
    rank: (value) => value && value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')

}