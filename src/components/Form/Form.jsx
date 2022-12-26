import { useForm } from 'react-hook-form';
import './Form.scss'
import RadioBtn from './RadioBtn';


const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

                    <RadioBtn category={'position'} label={'Frontend developer'} />
                    <RadioBtn category={'position'} label={'Backend developer'} />
                    <RadioBtn category={'position'} label={'Designer'} />
                    <RadioBtn category={'position'} label={'QA'} />
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