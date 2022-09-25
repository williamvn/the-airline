import React, { useContext } from 'react'
import { Panel } from '../Panel/Panel';
import { ContenLabel } from '../ContentLabel/ContentLabel';
import { Web3Context } from '../../contexts/Web3Context/Web3Context';

export const BalancePanel = () => {
    const { balance } = useContext(Web3Context);
    return (
        <Panel title="Balance">
            <ContenLabel content={balance + " ETH"}></ContenLabel>
        </Panel>
    )
}
