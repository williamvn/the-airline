import React, { useContext, useState } from 'react'
import FlightList from '../FlightList/FlightList';
import BookFlightPopup from '../BookFlightPopup/BookFlightPopup';
import { Panel } from '../Panel/Panel';
import { UserContext } from '../../contexts/UserContext/UserContext';

export const UserFlightsPanel = () => {
    const { userClient } = useContext(UserContext);
    const [showBookFlightPopup, setShowBookFlightPopup] = useState(false);

    return (
        <>
            <Panel title="Your flights" actionIconClass="fa fa-plus-square-o" actionPlaceHolder="Book New Flight" action={() => setShowBookFlightPopup(true)}>
                <FlightList flights={userClient.bookedFlights}></FlightList>
            </Panel>
            {showBookFlightPopup && <BookFlightPopup onClose={() => setShowBookFlightPopup(false)}></BookFlightPopup>}
        </>
    )
}
