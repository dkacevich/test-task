import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { fetchPositions, registerUser } from '../../services/serviceAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect, useRef, useState } from 'react'
import success from './../../assets/success.svg'
import { DevTool } from "@hookform/devtools";


import Preloader from '../Preloader/Preloader';
import RadioBtn from './RadioBtn';

import './Form.scss'
import { getToken } from './../../services/serviceAPI';



const getSchema = () => yup.object({
    // name: yup.string()
    //     .required('This field is required')
    //     .min(2, 'Username should contain 2-60 characters')
    //     .max(60, 'Username should contain 2-60 characters'),

    // email: yup.string()
    //     .required('This field is required')
    //     .email('Write correct email'),

    // phone: yup.string()
    //     .required('This field is required')
    //     .matches(/^[\+]{0,1}380([0-9]{9})$/, 'Type correct UA phone number'),

    // position_id: yup.number().required('This field is required'),

    // photo: yup.mixed()
    //     // .test('resolution', 'Photo must be at least 70x70 px', (file, context) => {
    //     //     if (file && file[0]?.type === 'image/jpeg' && file[0]?.size <= 5 * 1024 * 1024) {
    //     //         const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
    //     //             const img = new Image()
    //     //             img.onload = () => {
    //     //                 resolve({
    //     //                     height: img.height,
    //     //                     width: img.width
    //     //                 })
    //     //             }
    //     //             img.src = dataURL
    //     //         })
    //     //         const fileAsDataURL = window.URL.createObjectURL(file[0])
    //     //         getHeightAndWidthFromDataUrl(fileAsDataURL).then(({ width, height }) => {
    //     //             if (width > 70 && height > 70) {
    //     //                 return true
    //     //             }
    //     //             else return false
    //     //         })
    //     //     }
    //     // })
    //     .test('required', "You need to provide a file", (value) => {
    //         return value && value.length
    //     })
    //     .test("fileSize", "The file is too large", (value, context) => {
    //         return value && value[0] && value[0].size <= 5 * 1024 * 1024;
    //     })
    //     .test("type", "We only support jpeg", function (value) {
    //         return value && value[0] && value[0].type === "image/jpeg";
    //     })



});



const Form = () => {



    const { data, isLoading: positionLoading, isError: positionError, error } = useQuery('positions', fetchPositions, { select: ({ data }) => data })
    const { refetch: refetchToken } = useQuery('token', getToken, { select: ({ data }) => data, enabled: false })

    const registerQuery = useMutation({ mutationFn: ({ formData: data, token }) => registerUser({ data, token }) })

    const { register, handleSubmit, trigger, control, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            position_id: '1',
        },
        resolver: yupResolver(getSchema()),
    });


    if (positionLoading) return <Preloader />
    if (positionError) return `Error: ${error.message}`


    const positionRadio = data.positions.map(({ id, name }) => {
        return <RadioBtn key={id} id={id} register={register} label={name} />
    })


    const onSubmit = async (data) => {
        const { data: { token } } = await refetchToken()
        const formData = new FormData();

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                if (key === 'photo') formData.append(key, data[key][0])
                else formData.append(key, data[key])
            }
        }

        registerQuery.mutate({ formData, token })


    }


    const Content = registerQuery.isLoading ? <Preloader /> : (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='form__wrapper'
        >
            <div className="form__inputs">

                <Input {...{ trigger, register }} placeholder='Your name' name='name' error={errors.name} />
                <Input {...{ trigger, register }} placeholder='Email' name='email' error={errors.email} />
                <Input {...{ trigger, register }} placeholder='Phone' name='phone' error={errors.phone} helper='+38 (XXX) XXX - XX - XX' />

            </div>
            <div className="form__select">
                <div className="form__select-label">Select your position</div>
                {positionRadio}
            </div>

            <PhotoInput {...{ register, trigger, setError, clearErrors }} error={errors.photo} />

            <button className="button">Submit</button>
        </form>
    )
    if (registerQuery.isError) return <div className="mt-3">{registerQuery.error}</div>

    if (registerQuery.isSuccess) return <SuccsessReg />

    return (
        <div className='form'>
            <h1>Working with POST request</h1>
            {Error}
            {Content}
            <DevTool control={control} />
        </div>
    )
}


const SuccsessReg = () => {
    return (
        <div className="register-success mt-14">
            <h1>User successfully registered</h1>
            <img className='mx-auto mt-[50px]' src={success} alt="success" />
        </div>
    )
}






const Input = ({ trigger, register, error, name, placeholder, helper }) => {
    return (
        <div className={`form__input ${error && 'error'}`}>
            <input placeholder={placeholder} {...register(name, {
                onChange: (e) => {
                    if (name === 'phone') e.target.value = e.target.value.replace(/[a-zA-Zа-яА-Я ]/g, '')
                    if (error) trigger(name)
                }
            })} />
            {error && <span className="input-error-label">{placeholder}</span>}
            {error && <p className='error-text'>{error?.message}</p>}
            {(helper && !error) && <p className='helper-text'>{helper}</p>}
        </div>
    )
}
const PhotoInput = ({ register, error }) => {

    const [photoName, setPhotoName] = useState('')

    const putPhoto = (file) => {

        if (file === undefined) {
            setPhotoName('')
        } else {
            setPhotoName(file.name)
        }
    }


    return (
        <div className={`form__input-file ${error && 'error'}`}>
            <label className="form__file-label">
                <span>Upload</span>
                <input type="file" {...register('photo', {
                    onChange: (e) => {
                        putPhoto(e.target.files[0])
                    },
                })} />
                <div className={photoName && 'active-name'}>{photoName ? photoName : 'Upload your photo'}</div>
            </label>
            {error && <p className='error-text'>{error?.message}</p>}
        </div>

    )
}


export default Form