import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/page-header';
import PageContent from '../../components/page-content';
import Table from '../../components/table';
import api from '../../api';
import './index.css';
import { SearchBar } from '../../components/search-bar';
import { useHistory } from 'react-router-dom';
import { arrangeProcesses } from '../../utils';
import { SelectFilter } from '../../components/select-filter';

export const MasterList = () => {
    const [documents, setDocuments] = useState({});
    const [processes, setProcesses] = useState([]);
    const [filterByProcess, setFilterByProcess] = useState("All");
    const [filteredDocuments, setFilteredDocuments] = useState({});
    let tableRows = [];
    let history = useHistory();
    let documentsToList = filterByProcess != "All" ? filteredDocuments : documents;
    
    useEffect(() => {
        let isMounted = true;
        api.get(`/documents`)
            .then(response => {
                if(isMounted == true) {
                    setDocuments(response.data);
                    setFilteredDocuments(response.data);
                }
            })
            .catch(error => console.log(error));

        return () => isMounted = false
    }, [])

    useEffect(() => {
        let isMounted = true;
        api.get(`/processes`)
            .then(response => {
                if(isMounted == true) {
                    setProcesses(response.data);
                }
            })
            .catch(error => console.log(error));
            
        return () => isMounted = false
    }, [])

    useEffect(() => {
        if(filterByProcess != "All" && documents.length > 0){
            setFilteredDocuments(documents.filter((document) => {
                let validatedProcess = document.processes.filter((process) => {
                    return process.name == filterByProcess;
                })
                return validatedProcess.length > 0
            }));
        }
    }, [filterByProcess])

    function searchDocument(search) {
        search = search.trim();
        api.get(`/documents?q=${search}`)
        .then(response => {
            setDocuments(response.data);
        })
        .catch(error => console.log(error));
    }

    function makeTableRows() {
        documentsToList.map((document) => {
            tableRows.push(
                {
                    codigo: document.code,
                    titulo: document.title,
                    data: document.published ? document["release-date"] : 'N??o foi publicado',
                    processos: arrangeProcesses(document.processes),
                    onClick: () => {
                        //TODO: estudar react-router-dom
                        history.push(`/document-details/${document.id}`)
                    }
                }
            )
        })
    }

    function renderDocumentsTable() {
        makeTableRows();
        return <Table
            header={[
                {
                    title: "C??digo",
                    column: "codigo",
                },
                {
                    title: "T??tulo",
                    column: "titulo",
                },
                {
                    title: "Data da Publica????o",
                    column: "data",
                },
                {
                    title: "Processos",
                    column: "processos",
                },
            ]}
            rows={ tableRows }
            itemsPerPage={5}
        />
    }

    return (
        <>
            <PageHeader
                title="Lista de Documentos"
                caption="Abaixo est?? a lista contendo a apresenta????o dos nossos documentos"
            />
            <PageContent>
                <SearchBar function={searchDocument}/>
                <SelectFilter selectItems={processes} inicialValue={filterByProcess} function={setFilterByProcess}></SelectFilter>
                {documents && documents.length > 0 ? renderDocumentsTable() : <p>Informa????o n??o encontrada</p>}
            </PageContent>
        </>
    )
}