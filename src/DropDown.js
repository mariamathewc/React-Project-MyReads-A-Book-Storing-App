
import React from 'react'
import PropTypes from 'prop-types'



/*
 * This component takes a single book, display the book image, book title,
 * book author and the dropdown button in UI 
 */ 
class DropDown extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        shelfSwitch: PropTypes.func.isRequired,
        category: PropTypes.string.isRequired,
    }


/*
 *When a shelf is selected from Drop down button, 
 * handleChange is invoked that calls the shelfSwitch function passing down
 * the current book and its shelf as its argument.  
 */
    handleChange = (event) => {
        this.props.shelfSwitch(this.props.currentBook, event.target.value)
    }
 
   

    render() {

        const imageThumb = this.props.currentBook.imageLinks ? this.props.currentBook.imageLinks.smallThumbnail : null;
        const imageAuthor = this.props.currentBook.authors ? this.props.currentBook.authors : null;
        const imageTitle = this.props.currentBook.title ? this.props.currentBook.title : null;

        return (
            <div >
                <div className="book">
                    <div className="book-top">
                        <div className='book-cover-title'>
                            <div className='book-cover' 
                                style={{
                                    width: 128,
                                    height: 150,
                                    backgroundImage: `url(${imageThumb})`
                                }}
                                >  
                            </div>

                            <div
                                style={{
                                    width: 130,
                                    height: 10,
                                    
                                }}
                                >
                                <p className="book-title">{imageTitle}</p>
                                <p className="book-authors">{imageAuthor}</p>
                            </div>   
                        </div>

                        <div className="book-shelf-changer">
                            <select value={this.props.category.toString()} book={this.props.currentBook} onChange={this.handleChange }>                               
                                <option  value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading </option>
                                <option value="wantToRead"> Want to Read </option>
                                <option value="read"> Read </option>
                                <option select value="none">None</option>
                            </select>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

export default DropDown