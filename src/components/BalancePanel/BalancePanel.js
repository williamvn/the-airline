import React, { useContext } from 'react'
import { Web3Context } from '../../contexts/Web3Context/Web3Context';
import ContenLabel from '../ContentLabel/ContentLabel';
import { Panel } from '../Panel/Panel';

export const BalancePanel = () => {
    const { balance } = useContext(Web3Context);
    return (
        <Panel title="Balance">
            <ContenLabel content={balance + " ETH"}></ContenLabel>
        </Panel>
    )
}
