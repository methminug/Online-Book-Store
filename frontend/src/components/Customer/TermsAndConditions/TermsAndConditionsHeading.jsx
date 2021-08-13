import React, { Component } from 'react';

class TermsAndConditionsHeading extends Component {
    render() { 
        return ( 
            <div className="d-flex p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
                <h2 tag='div' className='display-1 pb-3 mb-3 border-bottom' style={{fontWeight:"bold"}}>TERMS AND CONDITIONS</h2>
            </div>
        );
    }
}
 
export default TermsAndConditionsHeading;