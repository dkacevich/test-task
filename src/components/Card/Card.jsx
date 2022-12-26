import './Card.scss'

const Card = ({email, name, phone, photo, position, position_id}) => {
    return (
        <div className='card'>
            <img src={photo} alt=""/>
            <div className="card__name">{name}</div>
           <p>
               <span className="card__position">{position}</span>
               <a href='' className="card__mail">{email}</a>
               <a href='' className="card__phone">{phone}</a>
           </p>
        </div>
    )
}


export default Card