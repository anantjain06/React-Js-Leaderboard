import React from 'react'
import { Constants } from '../shared/Constants';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

/*****Search Records Function with Props (User) */
const SearchRecords = (props) => {
  return (
       <Table striped bordered hover>
        <thead>
          <tr>
            {Constants.tableHeaderItems.map(item => <th key={item.itemName}>{item.itemName}</th>)}
          </tr>
        </thead>
        <tbody>
           { props.userData.map((item, counter) => <tr key={item.uid}>
              <td >{item.name}</td>
              <td >{(props.searchItemPos!==0 && props.searchItem.uid === item.uid) ? props.searchItemPos : counter + 1} </td>
              <td >{item.bananas}</td>
              <td >{(props.searchItem.uid === item.uid) ? 'Yes' : 'No'}</td>
            </tr>) }
        </tbody>
      </Table> 
  );
 }

 SearchRecords.propTypes = {
  userData: PropTypes.array,
  searchItem:PropTypes.object,
  searchItemPos:PropTypes.number
}
export default SearchRecords