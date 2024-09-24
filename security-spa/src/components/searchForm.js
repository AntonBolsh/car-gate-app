import React, {useState} from "react";
import './searchForm.css'

const SearchForm = () => {
    const [page, setPage] = useState("search")
    const [input, setInput] = useState("")
    const [property, setProperty] = useState("")

    const checkPlate = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:7100/car/${input}`).then((res) => {
            if (res.status === 200) {
                setPage("success")
                res.json().then(resp => {
                    setProperty(resp[0].property_id)
                })
            } else if (res.status === 404) {
                setPage("NotFound")
            }
        })
        
    }

    const handleInput = (e) => {
        setInput(e.target.value.toUpperCase())
        setPage("search")
    }

   return (
    <div>
        {page === "search" &&
            <div className="Search">
                <form>
                    <h1>Check plate Number</h1>
                    <input type="text" value={input} onChange={handleInput}></input> <br></br>
                    <button onClick={checkPlate}>SEARCH</button>
                </form>
            </div>
        }

        {page === "success" &&
            <div className="Success">
                <form>
                    <h1>Check plate Number</h1>
                    <input type="text" value={input} onChange={handleInput}></input> <br></br>
                    <p className="Announce">Car {input} belongs to property {property}</p>
                </form>
            </div>
        }

        {page === "NotFound" &&
            <div className="NotFound">
                <form>
                    <h1>Check plate Number</h1>
                    <input type="text" value={input} onChange={handleInput}></input> <br></br>
                    <p className="Announce">The Car {input} is not allowed</p>
                </form>
            </div>
        }
        
    </div>    
   )
}

export default SearchForm