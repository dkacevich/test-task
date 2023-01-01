
const Input = ({ trigger, register, error, name, placeholder, helper }) => {
    return (
        <div className={`form__input ${error && 'error'}`}>
            <input placeholder={placeholder} {...register(name, {
                onChange: (e) => {
                    
                    // If phone, don't allow to type alphabets
                    if (name === 'phone') e.target.value = e.target.value.replace(/[a-zA-Zа-яА-Я ]/g, '')

                    // If input has error, validate it on change
                    if (error) trigger(name)
                }
            })} />
            {error && <span className="input-error-label">{placeholder}</span>}
            {error && <p className='error-text'>{error?.message}</p>}
            {(helper && !error) && <p className='helper-text'>{helper}</p>}
        </div>
    )
}

export default Input