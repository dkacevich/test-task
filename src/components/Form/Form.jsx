import {useForm} from 'react-hook-form';
import {useQuery} from 'react-query';
import {fetchPositions} from '../../services/serviceAPI';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useState} from 'react'


import Preloader from '../Preloader/Preloader';
import RadioBtn from './RadioBtn';

import './Form.scss'


const schema = yup.object().shape({
    // name: yup.string()
    //     .required('This field is required')
    //     .min(2, 'Username should contain 2-60 characters')
    //     .max(60, 'Username should contain 2-60 characters'),
    //
    // email: yup.string()
    //     .required('This field is required')
    //     .email('Write correct email'),
    //
    // phone: yup.string()
    //     .required('This field is required')
    //     .matches(/^[\+]{0,1}380([0-9]{9})$/, 'Type correct UA phone number'),
    //
    // position_id: yup.number().required('This field is required'),

    photo: yup.mixed()
        .test('required', "You need to provide a file", (value) => {
            return value && value.length
        })
        .test("fileSize", "The file is too large", (value, context) => {
            return value && value[0] && value[0].size <= 200000;
        })
        .test("type", "We only support jpeg", function (value) {
            return value && value[0] && value[0].type === "image/jpeg";
        })
        .test('resolution', 'Photo must not be greater then 70x70 px', (file, context) => {
            if (file && file[0]?.type === 'image/jpeg' && file[0]?.size <= 500000) {
                const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
                    const img = new Image()
                    img.onload = () => {
                        resolve({
                            height: img.height,
                            width: img.width
                        })
                    }
                    img.src = dataURL
                })
                const fileAsDataURL = window.URL.createObjectURL(file[0])
                getHeightAndWidthFromDataUrl(fileAsDataURL).then(({width, height}) => {
                    return width < 70 && height < 70
                })
            }
        })


});


const Form = () => {

    const {data, isLoading, isError, error} = useQuery(
        'positions',
        fetchPositions,
        {
            select: ({data}) => data
        }
    )

    const {
        register,
        handleSubmit,
        setError,
        trigger,
        control,
        clearErrors,
        formState,
        formState: {errors},
    } = useForm({
        defaultValues: {
            position_id: '1',
        },
        resolver: yupResolver(schema),
        // reValidateMode: 'onBlur',
        mode: 'onBlur',
    });


    if (isLoading) return <Preloader/>
    if (isError) return `Error: ${error.message}`


    const positionRadio = data.positions.map(({id, name}) => {
        return (
            <RadioBtn
                key={id}
                id={id}
                register={register}
                label={name}
            />
        )
    })


    return (
        <div className='form'>
            <h1>Working with POST request</h1>
            <form
                onSubmit={handleSubmit((data) => console.log(data))}
                className='form__wrapper'
            >
                <div className="form__inputs">

                    <Input {...{trigger, register}} placeholder='Your name' name='name' error={errors.name}/>
                    <Input {...{trigger, register}} placeholder='Email' name='email' error={errors.email}/>
                    <Input {...{trigger, register}} placeholder='Phone' name='phone' error={errors.phone}>
                        <span className="form__phone-mockup">+38 (XXX) XXX - XX - XX</span>
                    </Input>

                </div>
                <div className="form__select">
                    <div className="form__select-label">Select your position</div>
                    {positionRadio}
                </div>

                <PhotoInput {...{register, trigger, formState, setError, clearErrors}} error={errors.photo}/>

                <button className="button">Submit</button>
            </form>
        </div>
    )
}

const Input = ({trigger, register, error, name, placeholder, children}) => {
    return (
        <div className="form__input">
            <input placeholder={placeholder} {...register(name, {
                onChange: (e) => {
                    if (name === 'phone') e.target.value = e.target.value.replace(/[a-zA-Zа-яА-Я ]/g, '')
                    if (error) trigger(name)
                }
            })} />
            {error && <p>{error?.message}</p>}
            {children}
        </div>
    )
}


const PhotoInput = ({register, error, setError, trigger, clearErrors}) => {

    const [photoName, setPhotoName] = useState('Upload your photo')

    const putPhoto = (file) => {

    }


    return (
        <>
            <label className="form__input-file">
                <span>Upload</span>
                <input type="file" {...register('photo', {
                    onChange: (e) => {
                        // trigger('photo')
                        clearErrors('photo')
                    },
                })} />
                <div>{photoName}</div>
            </label>
            <p>{error?.message}</p>
        </>

    )
}


export default Form