import React, { Fragment , useState} from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom'
import MetaData from "../layout/MetaData";

const Search = () => {
    const navigate = useNavigate()
    
    const [keyword,setKeyword] = useState("")
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate(`/products`)

        }
    }
  return (
    <Fragment>
          <MetaData title="Search Products" />

        <form className='searchBox' onSubmit={onSubmitHandler}>
            <input type='text' placeholder='Search For Products' onChange={(e) => setKeyword(e.target.value)} />
            <input type='submit' placeholder='Search' />
        </form>
    </Fragment>
  )
}

export default Search