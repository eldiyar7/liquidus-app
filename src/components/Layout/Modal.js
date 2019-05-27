import React, { Component } from 'react'
import get from 'lodash/get';

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCode: null,
            hasModal: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ zipCode: event.target.value });
    }

    handleSubmit() {
        this.props.setSelectedZipcode(this.state.zipCode);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postalCodes) {
            const defaultValue = get(nextProps, 'postalCodes.0');
            this.setState({ zipCode: defaultValue.postalCode });
        }
    }

    render() {
        const { postalCodes = [] } = this.props;
        const dropdownOptions = postalCodes.map(item => {
            const { postalCode, distance } = item;
            return (<option  key={postalCode+distance} >{postalCode}</option>);
        });
            
        return (    
            <div>
                <div className={this.props.isSubmitModal ? '' : 'modal'} tabIndex="-1" role="dialog" id="myModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Search deals by zip code</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <div className="form-group">
                            <select className="form-control" onChange={this.handleChange}>
                                { dropdownOptions }
                            </select>
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
