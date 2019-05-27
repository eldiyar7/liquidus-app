import React from 'react';
import get from 'lodash/get';

export default ({ listing }) => {
    const { images, deal, title, buyOnlineLinkURL, store, description } = listing;
    const { imageURL } = get(images, '0', {});

    return(
        <div className="col-md-3 col-ms-6 mb-5">
            <div className="card">
                <span className="badge badge-success">{deal}</span>
                <img className="card-img-top" src={imageURL} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{ title }</h5>
                    <p className="card-text">{description}</p>
                    {buyOnlineLinkURL ? (
                            <a href={buyOnlineLinkURL} className="btn btn-primary">Go somewhere</a>
                        ) :(
                            <p>Please visit {store.name} online</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}           