import Form from './components/Form/Form';
import Header from './components/Header/Header'
import Promo from './components/Promo/Promo';
import Team from './components/Team/Team';
import Preloader from './components/Preloader/Preloader';

import './App.scss'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <div className="app-container">
                <Promo />
                <Team />
                <Form/>
            </div>
        </QueryClientProvider>
    )
}



export default App
