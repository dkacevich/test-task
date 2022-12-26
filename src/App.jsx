import './App.scss'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import Promo from './components/Promo/Promo';
import GetRequests from './components/GetRequests/GetRequests';

const App = () => {

    return (
        <>
            <Header />
            <div className="app-container">
                <Promo />
                <GetRequests />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="text-yellow">
                    Hello world!
                </h1>
                <p className='text-blue'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet magnam mollitia
                    nostrum, odio ratione reiciendis! Amet consequatur eos, esse illum iure laboriosam mollitia neque nisi
                    non provident repellat, repellendus, sit?</p>
                <button className="button">Click</button>
                <Card />
            </div>
        </>
    )
}



export default App
