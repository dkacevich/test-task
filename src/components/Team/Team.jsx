import './Team.scss'
import Card from '../Card/Card';

const Team = () => {
  return (
    <div className='team'>
        <h1>Working with GET request</h1>
        <div className="team__grid">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <button className="button">Show more</button>
    </div>
  )
}

export default Team