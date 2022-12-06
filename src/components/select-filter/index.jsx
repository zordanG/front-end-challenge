import React, { useState } from 'react';

export const SelectFilter = (props) => {
    let text = "";

    return (
        //TODO: Deixar o componente bonito
        <select data-testid="selectfilter" name="processes" id="processes" value={props.inicialValue} onChange={(selection) => {props.function(selection.target.value)}}>
            <option value="All">Todos</option>
            {props.selectItems && props.selectItems.map((process) => {
                    return <option role={`Filter-${process.name}`} value={process.name} key={process.name}>{process.name}</option>})
            }
        </select>
    );
}