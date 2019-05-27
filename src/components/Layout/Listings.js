import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchListings } from '../../actions/fetchListings';
import Modal from './Modal';
import Card from './Card';

class Listings extends Component {

  constructor() {
    super();
    this.state = {
      selectedZipcode: null
    }

    this.setSelectedZipcode = this.setSelectedZipcode.bind(this);
  }

  componentWillMount() {
    this.props.fetchListings();
  }

  setSelectedZipcode(value) {
    this.setState({ selectedZipcode: value });
  }

  render() {
    const selectedListing = this.props.listingsByPostalCode[this.state.selectedZipcode] || [];
    const cards = selectedListing.map(listing => < Card key={listing.id} listing={listing}/>); 
    return (
      <div className="container">
        <Modal  
          isSubmitModal={!this.state.selectedZipcode} 
          postalCodes={this.props.postalCodes} 
          setSelectedZipcode={this.setSelectedZipcode} />
          <div className="row">
            { cards }
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listings: state.listings.listings,
    postalCodes: state.listings.postalCodes,
    listingsByPostalCode: state.listings.listingsByPostalCode,
  };
};

export default connect(mapStateToProps, { fetchListings })(Listings);
