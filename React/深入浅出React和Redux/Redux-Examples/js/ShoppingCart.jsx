const {createStore,applyMiddleware,compose} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const ReduxThunk = window.ReduxThunk.default;

const products = [
  {id:1,title:"iPhone 12",price:'5999',count:2},
  {id:2,title:"watch series 6",price:'2999',count:10},
  {id:3,title:'iPods',price:'1246',count:5}
]

class Cart extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>x
        <h2>Products</h2>
        <ul>
          {products.length > 0 && products.map((product) => (
            <li className="product-item" key={product['id']}>
              <div>{product['title']} - ${product['price']} x {product['count']}</div>
              <button>{ product['count'] > 0 ? 'Add to card' : 'Sold out' }</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
ReactDOM.render(
  <Cart/>,
  document.getElementById("card")
)