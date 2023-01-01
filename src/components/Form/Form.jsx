import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchPositions, registerUser, getToken } from '../../services/serviceAPI';


import Preloader from '../Preloader/Preloader';
import RadioBtn from './RadioBtn';
import PhotoInput from './PhotoInput';
import Input from './Input';
import SuccsessReg from './Success';

import './Form.scss'


// Validation schema

// There is only one issue
// I can't correct check if photo has at least 70x70 px
// Below is code where I tried

const getSchema = () => yup.object({
    
    name: yup.string()
        .required('This field is required')
        .min(2, 'Username should contain 2-60 characters')
        .max(60, 'Username should contain 2-60 characters'),

    email: yup.string()
        .required('This field is required')
        .email('Write correct email'),

    phone: yup.string()
        .required('This field is required')
        .matches(/^[\+]{0,1}380([0-9]{9})$/, 'Type correct UA phone number'),

    position_id: yup.number().required('This field is required'),

    photo: yup.mixed()
        // .test('resolution', 'Photo must be at least 70x70 px', (file, context) => {
        //     if (file && file[0]?.type === 'image/jpeg' && file[0]?.size <= 5 * 1024 * 1024) {
        //         const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
        //             const img = new Image()
        //             img.onload = () => {
        //                 resolve({
        //                     height: img.height,
        //                     width: img.width
        //                 })
        //             }
        //             img.src = dataURL
        //         })
        //         const fileAsDataURL = window.URL.createObjectURL(file[0])
        //         getHeightAndWidthFromDataUrl(fileAsDataURL).then(({ width, height }) => {
        //             if (width > 70 && height > 70) {
        //                 return true
        //             }
        //             else return false
        //         })
        //     }
        // })
        .test('required', "You need to provide a file", (value) => {
            return value && value.length
        })
        .test("fileSize", "The file is too large", (value, context) => {
            return value && value[0] && value[0].size <= 5 * 1024 * 1024;
        })
        .test("type", "We only support jpeg", function (value) {
            return value && value[0] && value[0].type === "image/jpeg";
        })



});




const Form = () => {

    const queryClient = useQueryClient()

    // Position Query
    const { data, isLoading: positionLoading, isError: positionError, error } = useQuery('positions', fetchPositions, { select: ({ data }) => data })
    
    // Token Query
    const { refetch: refetchToken } = useQuery('token', getToken, { select: ({ data }) => data, enabled: false })


    // Register user Mutation
    const {
        isSuccess: registerIsSuccess,
        isLoading: registerIsLoading,
        isError: registerIsError,
        error: registerError,
        mutate
    } = useMutation({
        mutationFn: ({ formData: data, token }) => registerUser({ data, token }),
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['users'] })
        }
    })


    // React Hook Form 
    const { reset, register, handleSubmit, trigger, setError, clearErrors, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues: {
            position_id: '1',
        },
        mode: 'onBlur   ',
        resolver: yupResolver(getSchema()),
    });


    // Check position status
    if (positionLoading) return <Preloader />
    if (positionError) return `Error: ${error.message}`


    // Radio Btns
    const positionRadio = data.positions.map(({ id, name }) => {
        return <RadioBtn key={id} id={id} register={register} label={name} />
    })


    // Submit function
    const onSubmit = async (data) => {
        const { data: { token } } = await refetchToken()
        const formData = new FormData();

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                if (key === 'photo') formData.append(key, data[key][0])
                else formData.append(key, data[key])
            }
        }

        mutate({ formData, token })
        reset()
    }





    // If register is Success
    if (registerIsSuccess) return <SuccsessReg />


    // Form content with Preloader or Form
    const Content = registerIsLoading ? <Preloader /> : (
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
            
            <button disabled={!isValid} className="button">Submit</button>
        </form>
    )


    // + Error message if exist
    return (
        <div className='form'>
            <h1>Working with POST request</h1>
            {registerIsError && <div className="mt-3">{registerError.response.data.message}</div>}
            {Content}
        </div>
    )
}


export default Form