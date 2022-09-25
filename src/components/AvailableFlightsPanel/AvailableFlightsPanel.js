import React, { useContext, useEffect, useState } from 'react'
import { Panel } from '../Panel/Panel';
import FlightList from '../FlightList/FlightList';
import { Web3Context } from '../../contexts/Web3Context/Web3Context';
import { useAvailableFlights } from '../../hooks/useAvailableFlights';
import { AirlineService } from '../../services/AirlineService';
import { FlightService } from '../../services/FlightService';
import { LoaderContext } from '../../contexts/LoaderContext/LoaderContext';

export const AvailableFlightsPanel = () => {
    const [availableFlights, setAvailableFlights] = useAvailableFlights();
    const { provider: web3, account } = useContext(Web3Context);
    const [isOwner, setIsOwner] = useState(false);
    const { setIsLoading } = useContext(LoaderContext);

    useEffect(() => {
        (async () => {
            const airlineService = await AirlineService.getInstance();
            airlineService.amIOwner(account).then(value => setIsOwner(value));
        })();
    }, [account]);

    const seedFlights = async () => {
        setIsLoading(true);
        const flightService = await FlightService.getInstance();
        await flightService.seedFlights(web3, account);
        const newSeedFlights = await flightService.getAvailableFlights();
        setAvailableFlights(newSeedFlights);
        setIsLoading(false);
    }

    return (
        <>
            <Panel title="Available Flights" actionIconClass={availableFlights.length === 0 && isOwner ? "fa fa-flask" : ""} actionPlaceHolder="Seed Flights" action={() => seedFlights()}>
                <FlightList flights={availableFlights}></FlightList>
            </Panel>
        </>
    )
}
