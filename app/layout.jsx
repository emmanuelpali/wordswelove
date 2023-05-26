
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Life Quotes",
    description: "Favourites quotes we love and want to share"
}

const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
           <Provider>
                <div className="main">
                    <div className="blue_gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
           </Provider>
        </body>
    </html>
  )
}

export default Rootlayout