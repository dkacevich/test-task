import './Form.scss'

const RadioBtn = ({label, checked, onChange}) => {
    return (
        <label className='radio-btn'>
            {/* <input type='radio' name={category} checked={checked}/> */}
            <input onChange={onChange} type='radio' name='position' checked={checked}/>
            <div className='radio-text'>{label}</div>
        </label>
    )
}

export default RadioBtn