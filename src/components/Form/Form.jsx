import { useForm } from 'react-hook-form';
import './Form.scss'
import RadioBtn from './RadioBtn';
import { useQuery } from 'react-query';
import { fetchPositions } from '../../services/serviceAPI';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';


const Form = () => {

    const { data, isLoading, isError, error } = useQuery(
        'positions',
        fetchPositions,
        {
            select: ({ data }) => data
        }
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [checked, setChecked] = useState(0)

    if (isLoading) return <Preloader />
    if (isError) return `Error: ${error.message}`


    const positionRadio = data.positions.map(({ id, name }, i) => {
        return <RadioBtn key={id} label={name} checked={i === checked} onChange={() => setChecked(i)}/>
    })

    return (
        <div className='form'>
            <h1>Working with POST request</h1>
            <form
                onSubmit={handleSubmit((data) => console.log(data))}
                className='form__wrapper'
            >
                <div className="form__inputs">
                    <div className="form__input">
                        <input placeholder='Your name' {...register('name')} />
                    </div>
                    <div className="form__input">
                        <input placeholder='Email' {...register('email')} />
                    </div>
                    <div className="form__input">
                        <input placeholder='Phone' {...register('phone')} />
                        <span className="form__phone-mockup">+38 (XXX) XXX - XX - XX</span>
                    </div>
                </div>
                <div className="form__select">
                    <div className="form__select-label">Select your position</div>
                    {positionRadio}
                    {/* 
                        Equal 

                        <RadioBtn category={'position'} label={'Frontend developer'} />
                        <RadioBtn category={'position'} label={'Backend developer'} />
                        <RadioBtn category={'position'} label={'Designer'} />
                        <RadioBtn category={'position'} label={'QA'} />
                     */}
                </div>

                <label className="form__input-file">
                    <span>Upload</span>
                    <input type="file" />
                    <div>Upload your photo</div>
                </label>

                <button disabled={true} className="button">Submit</button>
            </form>
        </div>
    )
}

export default Form