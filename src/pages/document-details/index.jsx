import React, { useState, useEffect } from 'react';
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';

export const DocumentDetails = (props) => {
    const [document, setDocument] = useState({});

    useEffect(() => {
        api.get(`/documents/${props.match.params.id}`)
            .then(response => setDocument(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <PageHeader
                title="Document Details"
            />
            <PageContent>
                <div>
                    {document?.code}
                </div>
                <div>
                    {document?.title}
                </div>
                <div>
                    {document['release-date']}
                </div>
                <div>
                    {document?.published}
                </div>
                <div>
                    {document?.active}
                </div>
                <div>
                    {document?.processes}
                </div>
            </PageContent>
        </div>
    );
}