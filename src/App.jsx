import Form from './components/Form/Form';
import Header from './components/Header/Header'
import Promo from './components/Promo/Promo';
import Team from './components/Team/Team';
import Preloader from './components/Preloader/Preloader';

import './App.scss'



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
