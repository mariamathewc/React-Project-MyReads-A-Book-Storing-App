// JavaScript source code
import React from 'react'
import DropDown from './DropDown'
import PropTypes from 'prop-types'


/*
 * This component is responsible for building shelfs by taking each book from books array and pass it to another component("DropDown") 
 */ 
class Shelf extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfSwitch: PropTypes.func.isRequired,
        category: PropTypes.string.isRequired,
    }


    render() {
     
        return (
            <div>
                <ol className='books-grid' >{
                    this.props.books.map((book) => (
                        <li  key={book.id}>
                            <div >  
                                <DropDown key={book.id} currentBook={book} shelfSwitch={this.props.shelfSwitch} category={this.props.category} />   
                            </div>
                        </li>
                      )
                    )
                  }
                </ol>
             </div>
            )
    }
}


export default Shelf