import './GetRequests.scss'
import Card from './../Card/Card';

const GetRequests = () => {
  return (
    <div className='getrequests'>
        <h1>Working with GET request</h1>
        <div className="getrequests__grid">
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

export default GetRequests