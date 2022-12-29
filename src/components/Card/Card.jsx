import './Card.scss'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useId } from 'react'
import placeholder from './../../assets/user.svg'



const Card = ({ id, email, name, phone, photo, position, position_id }) => {
    const nameId = useId()
    const mailId = useId()
    const phoneId = useId()
    const positionId = useId()

    const TooltipProps = {
        place: 'bottom',
        offset: 21,
        events: ['click'],
        className: 'card-tooltip'
    }

    const photoUrl = photo === 'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png' ? placeholder : photo;

    return (
        <div className='card'>
            <img src={photoUrl} alt="" />
            <div id={nameId} className="card__name">{name}</div>
            <p>
                <span id={positionId} className="card__position">{position}</span>
                <span id={mailId} className="card__mail">{email}</span>
                <span id={phoneId} className="card__phone">{phone}</span>
            </p>

            <Tooltip anchorId={nameId}      content={name}      {...TooltipProps} />
            <Tooltip anchorId={positionId}  content={position}  {...TooltipProps} />
            <Tooltip anchorId={mailId}      content={email}     {...TooltipProps} />
            <Tooltip anchorId={phoneId}     content={phone}     {...TooltipProps} />
        </div>
    )
}


export default Card