import Form from './components/Form/Form';
import Header from './components/Header/Header'
import Promo from './components/Promo/Promo';
import Team from './components/Team/Team';

import './App.scss'
import { Element } from 'react-scroll';



const App = () => {

    return (
        <>
            <Header />
            <div className="app-container">
                <Promo />
                <Element name='team'>
                    <Team />
                </Element>
                <Element name='form'>
                    <Form />
                </Element>
            </div>
        </>
    )
}



export default App
