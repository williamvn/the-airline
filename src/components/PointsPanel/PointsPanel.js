import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext/UserContext';
import { Web3Context } from '../../contexts/Web3Context/Web3Context';
import { useUserClient } from '../../hooks/useUserClient';
import { AirlineService } from '../../services/AirlineService';
import ContenLabel from '../ContentLabel/ContentLabel';
import { Panel } from '../Panel/Panel';

export const PointsPanel = () => {
    const { userClient } = useContext(UserContext);
    const { account } = useContext(Web3Context);

    const exchangePoints = async () => {
        const airlineService = await AirlineService.getInstance();
        try {
            airlineService.reclaimPoints(account);
            alert("Operation In Progress");
        } catch (error) {
            console.log(error);
            if (error.message.includes("Not enought points")) {
                alert("No enough points");
            }
            else {
                alert("In this moment it is not possible to reclaim points. Try later");
            }
        }
    }

    return (
        <Panel title="Loyality points - refundable ether" actionIconClass="fa fa-exchange" actionPlaceHolder="Exchange Points for Ether" action={() => exchangePoints()}>
            <ContenLabel content={userClient.loyalityPoints + " points"}></ContenLabel>
        </Panel>
    )
}
