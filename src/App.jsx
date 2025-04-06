import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { Footer } from "./components/Footer";
import { db } from "./data/db";

function App() {


  const initialCart = () => {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  }

  // States
  const [ data ] = useState(db)
  const [ cart, setCart ] = useState(initialCart)
  
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify( cart ))
  }, [cart])
  

  // Agregando guitarras en el carrito
  const addToCart = ( item ) => {

    const itemExists = cart.findIndex(( guitar ) => guitar.id === item.id )
    
    //? Actualizando cantidad o nueva guitarra
    if ( itemExists >= 0) { // existe en el carrito 

      // Valida que no se añadan nuevas guitarras de acuerdo al máximo
      if ( cart[itemExists].quantity >= MAX_ITEMS ) return 

      // Para no mutar el state
      const updatedCart = [ ...cart ]
      updatedCart[ itemExists ].quantity++
      setCart(updatedCart)

    } else { // no existe y se agrega la cantidad de 1
      item.quantity = 1
      setCart([ ...cart, item ])
      // setCart((prevState) => [ ...prevState, item ])
    }

    // Almacenar en localstorage

  }
  

  //? Quitar guitarra del carrito
  const removeFromCart = ( id ) => {
    setCart( (prevCart) => prevCart.filter( guitar => guitar.id !== id) )
  }

  //? Aumentar cantidad de guitarras
  const increaseQuantity = ( id ) => {

    const updatedCart = cart.map( guitar => {
      // limitando la cantidad a agregar
      if ( guitar.id === id && guitar.quantity < MAX_ITEMS ) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1 
        }       
      }
      return guitar 
    })

    setCart( updatedCart )
  }

  //? Disminuir cantidad de guitarras
  const decreaseQuantity = ( id ) => {

    const updatedCart = cart.map( guitar => {
      if ( guitar.id === id && guitar.quantity > MIN_ITEMS ) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1 
        }       
      }
      return guitar 
    })

    setCart( updatedCart )
  }

  //? Limpia carrito 
  const clearCart = () => {
    setCart([])
  }



  return (
    <>
      <Header 
        cart={cart} 
        removeFromCart={ removeFromCart }
        increaseQuantity={ increaseQuantity }
        decreaseQuantity={ decreaseQuantity}
        clearCart={ clearCart }
      />
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
