import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';// imports the progress bar component from react-bootstrap
import Alert from 'react-bootstrap/Alert';// imports the alert component from react-bootstrap
import Hit from './Hit';
import Table from 'react-bootstrap/Table'; //imports the table component from react-bootstrap


export default function SearchComponent(){

    const [searchResult, setSearchResult] = useState({hits:[]}); //searchResult: what we get in response to the query, is an Array, find the key to the array, i.e. hits 
    const [query, setQuery] = useState(''); //whatever the use types should read as query in the search box
    const [Loading, setLoading] = useState(false); //controls the progress bar
    const [isPageInError, setIsPageInError] = useState(false);

    async function search(){ //triggers a  state variable isLoading to True
        try{
        setLoading(true) //triggers lines 29-30 (the 'if' block)
          const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
          const searchResult = await response.json() //the searchResult variable from the State variable above (line 10) is changed on this line and set to the await response of the json from the api
          setSearchResult(searchResult)
        }catch(error){
          console.error(error)
          setIsPageInError(true)
        }finally{ //used to do clean-up operation and to remove temporary stuff like progress bar
            setLoading(false) // removes the progress bar after the page loads
            
        }
      }
      
            //the if - code lines below (31-40) are used to show the progress bar and/or error messages
            
            
      if(Loading){ //takes the variable loading from line 12
          return <ProgressBar now={300} /> //displays the progress bar while the page is loading
          }
          else if(isPageInError){ //takes the variable isPageInError from line 13
              return <Alert variant={'danger'}> {/**displays an error message because nothing was typed into the search field */}
                      There was an error in calling the ApI, please try later!
                  </Alert>

                } 
                 else { //the codes below return the JSX for rendering on the UI

        return (
          <>
            <input
            type="search"
            value={query} //this sets the state variable,- (in this case, query -- line 11)- to an empty field in the text searchbox
            onChange= {e => setQuery(e.target.value)}// On the change of the state of the searchbox, the setQuery function, calls (e.target.value)
            />

            <button onClick={ () => { search() }}>Search</button>  {/** on the click of the search button, the search function is called and everything from lines 15-28 runs  */}
            
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


    

        