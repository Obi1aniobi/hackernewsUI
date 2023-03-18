import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';
import Hit from './Hit';
import Table from 'react-bootstrap/Table';


export default function SearchComponent(){

    const [searchResult, setSearchResult] = useState({hits:[]}); //searchResult is an Array, find the key to the array, i.e. hits
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false); //controls the progress bar
    const [isPageInError, setIsPageInError] = useState(false);

    async function search(){ //triggers a  state variable isLoading to True
        try{
        setIsLoading(true) //triggers lines 29-30 (the 'if' block)
          const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
          const searchResult = await response.json()
          setSearchResult(searchResult)
        }catch(error){
          console.error(error)
          setIsPageInError(true)
        }finally{ //used to do clean-up operation and to remove temporary stuff like progress bar
            setIsLoading(false) //
        }
      }
      

      if(isLoading){ 
          return <ProgressBar now={300} />
          }
          else if(isPageInError){
              return <Alert variant={'danger'}>
                      There was an error in calling the ApI, please try later!
                  </Alert>

                } 
                 else {

        return (
          <>
            <input
            type="search"
            value={query}
            onChange= {e => setQuery(e.target.value)}
            />

            <button onClick={ () => { search() }}>Search</button>
            {
              searchResult.hits && searchResult.hits.length === 0 && <Alert variant={'info'}>
                No results found.
          </Alert>
            }
    
    {
      searchResult.hits && searchResult.hits.length > 0 &&

    
          <Table striped bordered hover variant="dark">

            <thead>
              <tr>
                  <th>Search results</th>
              </tr>
            </thead>
            
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>URL</th>
                <th>Author</th>
              </tr>
            </thead>


            {/**the tbody contains the search result below */}
            <tbody>
                    {searchResult.hits && searchResult.hits.map((hit, index) => <Hit id={index} hit={hit} />)}
            </tbody>
          </Table>
                 }
          </>
      )

    }    

}


    

        