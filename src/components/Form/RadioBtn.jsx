import './Form.scss'

const RadioBtn = ({id, label, register}) => {
    return (
        <label className='radio-btn'>
            <input type='radio' value={id} {...register('position_id')}/>
            <div className='radio-text'>{label}</div>
        </label>
    )
}

export default RadioBtn