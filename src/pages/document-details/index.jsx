import React, { useState, useEffect } from 'react';
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import { arrangeProcesses } from '../../utils';
import DocumentCard from './components/document-card';

export const DocumentDetails = (props) => {
    const [document, setDocument] = useState({});

    useEffect(() => {
        api.get(`/documents/${props.match.params.id}`)
            .then(response => setDocument(response.data))
            .catch(error => console.log(error));
    }, []);
    
    function getDocument(){        
        return <DocumentCard
            code={document.code}
            title={document.title}
            published={document.published}
            releaseDate={document['release-date']}
            active={document.active}
            processes={arrangeProcesses(document.processes)}
        />
    }

    return (
        <div>
            <PageHeader
                title="Document Details"
            />
            <PageContent>
                {document.id && getDocument()}
            </PageContent>
        </div>
    );
}