import React, { useState, useEffect } from 'react';
import api from '../../api';

export const DocumentDetails = (props) => {
    const [document, setDocument] = useState({});

    useEffect(() => {
        api.get(`/documents/${props.match.params.id}`)
            .then(response => setDocument(response.data))
            .catch(error => console.log(error));
    }, []);

    return (<h1>Document Details: {document?.title}</h1>);
}