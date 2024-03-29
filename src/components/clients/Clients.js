import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import moduleName, { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  state = {
      totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
        let total = clients.reduce((total, client) => {
            return total + parseFloat(client.balance.toString());
        }, 0)
        return { totalOwed : total }
    }
  
  return null;
}
  render() {
      const { clients } = this.props;
      const { totalOwed } = this.state;
    // const clients = [{
    //     id:'434567218',
    //     firstName: 'Kevin',
    //     lastName: 'Jones',
    //     email: 'kjones@gmail.com',
    //     phone: '555-555-1212',
    //     balance:'30.00'
    // },{
    //     id:'434567219',
    //     firstName: 'Jane',
    //     lastName: 'Smith',
    //     email: 'jsmith@live.com',
    //     phone: '555-555-1212',
    //     balance:'10.00'
    // }
    // ]
    ;
    if (clients) {
        return (
            <div>
              <div className="row">
              <div className="col-md-6">
              <h2>{' '}
              <i className="fas fa-users" /> Clients{' '}
              </h2>
              </div>
              <div className="col-md-6">
                <h5 className="text-right text-secondary">
                Total Owed{' '}
                <span className="text-primary" />
                ${parseFloat(totalOwed).toFixed(2)}
                </h5>
              </div>
              <table className="table table-striped">
                <thead className="thead-inverse">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {clients.map(client => ( 
                      <tr key={client.id}>
                       <td>{client.firstName} {client.lastName}</td> 
                       <td>{client.email}</td>
                       <td>${parseFloat(client.balance).toFixed(2)}</td>
                       <td>
                           <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                           <i className="fas fa-arrow-circle-right" />{' '}Details
                           </Link>
                       </td>
                       </tr>
                        ))}
                </tbody>
              </table>
              </div>
            </div>
          )
    } else {
        return <Spinner />;
    }
    
  }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{collection: 'clients'}]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);
