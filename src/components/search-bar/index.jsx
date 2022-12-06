import React, { useState } from 'react';
import {
    Form,
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export const SearchBar = (props) => {
    let text = "";

    return (
        <Form data-testid="searchbar" className="align-right" onSubmit={(event) => event.preventDefault()} >
            <InputGroup>
                <Input placeholder="Pesquisa..." onChange={(event) => text = event.target.value }/>
                <InputGroupAddon addonType="append">
                    <Button data-testid="search" type="submit" onClick={() => props.function(text)}>
                        <ion-icon name="search-outline"></ion-icon>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    );
}