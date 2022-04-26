import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { searchElementIndex, sortPlayers, getTopPlayers, searchPlayers } from '../shared/Functions';

import SearchRecords from './SearchRecords';
import { Constants } from '../shared/Constants';

const Layout = () => {

    /*********Define Variables for getting User Data************/
    const [players, setPlayersData] = useState([]);
    const [userName, setUserName] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [searchItem, setSearchItem] = useState({})
    const [userData, setUserData] = useState([]);
    const [searchElemPos, setSearchElemPos] = useState(0);
    const searchContainerRef = React.useRef(null);

    /*********Get User Json File Data (No Input Params)************/
    useEffect(() => {
        axios.get(`leaderboard.json`)
            .then((response) => {
                setPlayersData(response.data);
            })
    }, []);

    /*********Trigger Search Button Event (Params: Name as a search keyword)************/
    const _getResults = () => {
        let sortedData = sortPlayers(players);
        if (Object.keys(sortedData).length > 0) {
            let topRecords = getTopPlayers(sortedData);
            let [searchElem] = searchPlayers(topRecords, userName);

            setShowTable(true);
            searchContainerRef.current.classList.remove("position-center");
            if (searchElem && userName) {       /*****Case 1 : Searched Name is there in top 10 ranking*******/
                setSearchElemPos(0);
                searchContainerRef.current.classList.add("mt-3");
            } else {
                const elemPos = searchElementIndex(sortedData, userName);
                [searchElem] = searchPlayers(sortedData, userName);
                if (elemPos !== -1 && userName) {   /*****Case 2 : Searched Name is not in top 10 ranking but exists in json records*******/
                    topRecords = topRecords.splice(0, 9);
                    topRecords.push(searchElem)
                    setSearchElemPos(elemPos);
                    searchContainerRef.current.classList.add("mt-3");
                } else {  /*****Case 3 : Searched Name is not in top 10 ranking and not in json records*******/
                    topRecords = [];
                    searchContainerRef.current.classList.add("position-center");
                }
            }
            setSearchItem(searchElem);
            setUserData(topRecords);
        }
    }

    return (
        <Row className="row position-center" ref={searchContainerRef}>
            <Col className='text-center'>
                <div className="input-icons">
                    <img className='search-icon' src="search.svg" width={40} height={50} alt="search-icon" />
                    <input type="search" name="search-form" id="search-form" className="search-input" placeholder="User Name" value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                    <Button variant="primary"onClick={_getResults}>Search</Button>
                </div>
                {(showTable && userData.length === 0) ? <div className='text-center text-danger'>{Constants.noRecordFoundMsg}</div> : null}
            </Col>
            <Col lg="12">
                {(showTable && userData.length > 0) ? <SearchRecords userData={userData} searchItem={searchItem} searchItemPos={searchElemPos} /> : null}
            </Col>
        </Row>
    );
}
export default Layout;