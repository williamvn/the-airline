import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext/UserContext';
import BookFlightPopup from '../BookFlightPopup/BookFlightPopup';
import FlightList from '../FlightList/FlightList';
import { Panel } from '../Panel/Panel';

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
