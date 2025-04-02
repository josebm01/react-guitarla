import { useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { Footer } from "./components/Footer";
import { db } from "./data/db";

function App() {

  // State
  const [ data, setData ] = useState(db)
  const [cart, setCart] = useState([])

  const addToCart = ( item ) => {

    const itemExists = cart.findIndex(( guitar ) => guitar.id === item.id )
    
    // Actualizando cantidad o nueva guitarra
    if ( itemExists >= 0) { // existe en el carrito 

      // Para no mutar el state
      const updatedCart = [ ...cart ]
      updatedCart[ itemExists ].quantity++
      setCart(updatedCart)

    } else { // no existe y se agrega la cantida de 1
      item.quantity = 1
      setCart([ ...cart, item ])
      // setCart((prevState) => [ ...prevState, item ])
    }

  }
  

  return (
    <>
      <Header cart={cart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar 
                 key={ guitar.id } 
                guitar={ guitar } 
                setCart={ setCart }
                addToCart={ addToCart}
              />
            ))
          }
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
