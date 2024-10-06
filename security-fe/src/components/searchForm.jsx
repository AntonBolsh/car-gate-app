import React, {useState} from "react";
import './searchForm.css'

const SearchForm = ({ token }) => {
    const [page, setPage] = useState("search")
    const [input, setInput] = useState("")
    const [property, setProperty] = useState("")

    const checkPlate = (e) => {
        e.preventDefault();
        const beLink = import.meta.env.VITE_BACKEND_LINK

        const headers = {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
            };
        
        fetch(`${beLink}/cars/${input}`, {
            method: 'GET',
            headers: headers
            })
            .then((carRes) => {
            if (carRes.status === 200) {
                setPage("success")
                carRes.json().then(carResp => {
                    console.log(carResp)
                    setProperty(carResp.property_address)
                })
                return;
            } else if (carRes.status === 404) {
                fetch(`${beLink}/visits/${input}`, {
                method: 'GET',
                headers: headers
                }).then((visitRes) => {
                    if (visitRes.status === 200) { //here need to check also if there are visits for today
                        setPage("success")
                        visitRes.json().then(visitResp => {
                            setProperty(visitResp[0].property_id)
                        })
                        return;
                    } else if (visitRes.status === 404) {
                        setPage("NotFound")
                        return;
                    }
                })
            }
            // Here need to process errors of API other than 404
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