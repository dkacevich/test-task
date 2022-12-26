import './App.scss'
import Card from './components/Card/Card'
import Form from './components/Form/Form';
import Header from './components/Header/Header'
import Promo from './components/Promo/Promo';
import Team from './components/Team/Team';

const App = () => {

    return (
        <>
            <Header />
            <div className="app-container">
                <Promo />
                <Team />
                <Form/>
            </div>
        </>
    )
}



export default App
