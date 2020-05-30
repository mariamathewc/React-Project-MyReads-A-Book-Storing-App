import React from 'react'
import Shelf from './Shelf'
import * as BookData from './BooksAPI';
import SearchBooks from './SearchBooks'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

/*
 * This class renders either the bookshelves or the search page based on the URL
 */
class App extends React.Component {


/*
 * Component state
 */ 
    state = {
        allBooks: []
    }


 /*
  * Makes an API call to load books from database and update the state of "allBooks" with the data from database 
  */ 
    componentDidMount() {
        BookData.getAll()
            .then((allBooks) => {
                this.setState({
                    allBooks:allBooks
                });
            });  
    }


/*
 * Returns an array of books whose shelf category is same as the parameter "shelf" that is passed down the function  
 */ 
    booksByCategory = (shelf) =>
        this.state.allBooks.filter((book) =>
            book.shelf === shelf
        )


/*
 * Whenever we add a new book to a shelf or when we swap the books between shelfs which is done by toggling the dropdown button,
 * we add the new shelf value to this modified book and update the state of allBooks to render this new change in UI
 */ 
    shelfSwitch = (book, shelf) => {   
        BookData.update(book, shelf)

        book.shelf = shelf;

        let modifiedBooks = this.state.allBooks.filter(b => b.id !== book.id);
            modifiedBooks = modifiedBooks.concat(book);
        
        this.setState({
            allBooks: modifiedBooks,
        });
    }



    render() {
       

        return (
            <div>
                

                <Route exact path='/' render={() => (


                    <div >
                        
                        <div className="list-books-title"  >
                            <h1> MyReads</h1>
                        </div>

                        <div className="bookshelf" >
                            <div> <h2 className="bookshelf-title"> Currently Reading</h2></div>
                            <Shelf books={this.booksByCategory('currentlyReading')} shelfSwitch={this.shelfSwitch} category={'currentlyReading'} />
                        </div>

                        <div className="bookshelf">
                            <div> <h2 className="bookshelf-title"> Want to Read</h2></div>
                            <Shelf books={this.booksByCategory("wantToRead")} shelfSwitch={this.shelfSwitch} category={'wantToRead'} />
                        </div>

                        <div className="bookshelf">
                            <div> <h2 className="bookshelf-title"> Read</h2></div>
                            <Shelf books={this.booksByCategory("read")} shelfSwitch={this.shelfSwitch} category={'read'} />
                        </div>


                        <div className="open-search">
                            <Link to={`/search`} className='open-search-link' > Add a book </Link>
                        </div>

                    </div>

                )} />


                <Route exact path='/search' render={() => (
                    < SearchBooks allBooks={this.state.allBooks} shelfSwitch={this.shelfSwitch} />
                )} />
            </div>
        );
    }
}

export default App
