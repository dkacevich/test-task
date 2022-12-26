import './Card.scss'
import photo from './../../assets/user.svg'



const Card = () => {
    return (
        <div className='card'>
            <img src={photo} alt=""/>
            <div className="card__name">Salvador Stewart Flynn Thomas...</div>
           <p>
               <div className="card__position">Frontend Developer Frontend ...</div>
               <a href='' className="card__mail">frontend_develop@gmail.com</a>
               <a href='' className="card__phone">+38 (098) 278 44 24</a>
           </p>
        </div>
    )
}


export default Card