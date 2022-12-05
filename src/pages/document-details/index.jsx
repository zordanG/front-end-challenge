import React, { useState, useEffect } from 'react';
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import ProcessCard from './components/process-card';

export const DocumentDetails = (props) => {
    const [document, setDocument] = useState({});
    let processesList = [];

    useEffect(() => {
        api.get(`/documents/${props.match.params.id}`)
            .then(response => setDocument(response.data))
            .catch(error => console.log(error));
    }, []);
    
    //TODO: trocar processes por document
    function getProcesses(){
        let listLength = 0;

        document.processes.map((process) => {
            processesList.push(process.name + ", ");
        })

        listLength = processesList.length - 1;
        processesList[listLength] = processesList[listLength].replace(", ", " ");
        
        
        return <ProcessCard
            code={document.code}
            title={document.title}
            published={document.published}
            releaseDate={document['release-date']}
            active={document.active}
            processes={processesList}
        />
    }

    return (
        <div>
            <PageHeader
                title="Document Details"
            />
            <PageContent>
                {document.id && getProcesses()}
            </PageContent>
        </div>
    );
}