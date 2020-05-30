// JavaScript source code
import React from 'react'
import DropDown from './DropDown'
import { Link } from 'react-router-dom';
import * as BookData from './BooksAPI'
import PropTypes from 'prop-types'


/*
 * This component is responsible for building the search page and reuses the DropDown component to display the search results
 */ 
class SearchBooks extends React.Component {
   
    static propTypes = {
        allBooks: PropTypes.array.isRequired,
    }


/*
 * Component state
 */
    state = {
        query: '',
        results: [],   
    }


 /*
  *When a user types input in search box, the updateQuery function is invoked
  * which set the state of query with new input and then calls the updateResult function
  * 
  */
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        this.updateResult(query)
    }


/*
 * If there is no input in search box,results array is set as an empty array.
 * If their is an input in search box, BookData.search API function search for matching books from database.
 * If matches are found, we set the state of results array with search result. 
 * If an error is returned, results array is set as an empty array.
 */ 
    updateResult(query) {
        if (query.length > 0) {
            BookData.search(query).then(results => {
                results.error ?
                    this.setState({ results: [] })
                    : this.setState({ results })
            })
        }
        else {
            this.setState({ results: [] })
        }
    }



    render() {   

        const updatedBooks =  this.state.results.map(book => {
            this.props.allBooks.map(b => {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                }
                return b;
            });

            return book;
        });
   
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to={`/`} className="close-search">Close</Link> 
                            <div className="search-books-input-wrapper">
                                <input
                                    type="text"
                                    
                                    value={this.state.query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                    placeholder="Search book"    />
                            </div>
                    </div>

                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>

                <div >
                    <ol className="books-grid">
                        {this.state.results && this.state.results.length > 0 &&   updatedBooks.map((book) => (
                            <li key={book.id} >   
                                <DropDown key={book.id} currentBook={book} shelfSwitch={this.props.shelfSwitch} category={book.shelf ? book.shelf : 'none'} />
                            </li>
                        )  
                       )   
                      }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks