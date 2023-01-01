import success from './../../assets/success.svg'


const SuccsessReg = () => {
    return (
        <div className="register-success mt-14">
            <h1>User successfully registered</h1>
            <img className='mx-auto my-[50px]' src={success} alt="success" />
        </div>
    )
}


export default SuccsessReg