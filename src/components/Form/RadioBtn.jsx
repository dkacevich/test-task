import './Form.scss'

const RadioBtn = ({label, category, checked}) => {
    return (
        <label className='radio-btn'>
            <input type='radio' name={category} checked={checked}/>
            <div className='radio-text'>{label}</div>
        </label>
    )
}

export default RadioBtn