import React, { useState } from 'react';

export const SelectFilter = (props) => {
    let text = "";

    return (
        //TODO: Deixar o componente bonito
        <select name="processes" id="processes" value={props.inicialValue} onChange={(selection) => {props.function(selection.target.value)}}>
            <option value="All">Todos</option>
            {props.selectItems && props.selectItems.map((process) => {
                    return <option value={process.name} key={process.name}>{process.name}</option>})
            }
        </select>
    );
}