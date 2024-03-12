import { useEffect } from "react";
import { useState } from "react";
import Bottle from "./Comphonents/Bottle/Bottle";
import { addToLs, getStoredCart } from "./Comphonents/Utlity/LocalStorage";


const App = () => {
  const [showBottle,setShowBottle] = useState([]);
  const [selectedBottle,setSelectedBottle] = useState([])
  useEffect(() => {
    fetch('watches.json')
    .then(res => res.json())
    .then(data => setShowBottle(data))
  },[])
  // console.log(showBottle);


  const handleBottle = (bottle) => {
    const bottleContainer = [...selectedBottle,bottle]
    setSelectedBottle(bottleContainer)
    console.log(bottleContainer)
    addToLs(bottle.id) ///  add to local storage 
  }
  ////  get data to the local storage  // 

  useEffect(() => {
    // console.log('bottle', showBottle.length)
    let saveCart = [];
    if(showBottle.length > 0){
      const getDataToLs = getStoredCart();
      console.log(getDataToLs,showBottle);
      for(const id of getDataToLs){
        console.log(id)
        const findOperation = showBottle.find(bottle => bottle.id === id)
        if(findOperation){
          saveCart.push(findOperation)
        }
      }
      setSelectedBottle(saveCart)
    }
  },[showBottle])

  return (
    <div>
      <div className="my-20 md:mb-40">
        <p className="text-5xl font-bold text-center text-red-500">This is very special Bottles</p>
        <div>
          <p className="font-bold text-center my-5 text-2xl">Selected Bottles : {selectedBottle.length}</p>
          <div className="flex justify-center">
           <div>
           {
              selectedBottle.map(detail => <div className="flex items-center gap-5 my-5" key={detail.id}>
              <li className="text-xl font-bold text-lime-800 w-4/5">{detail.name}</li>
              <img className="w-[100px] h-[100px] rounded-xl" src={detail.img} alt="" />
              </div>)
            }
           </div>
          </div>
        </div>

      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {
          showBottle.map((bottle) => <Bottle key={bottle.id} bottle=
          {bottle} handleBottle={handleBottle} ></Bottle>)
        }
      </div>
    </div>
  );
};

export default App;