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
        api.get(`/documents`)
            .then(response => {
                setDocuments(response.data);
                setFilteredDocuments(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        api.get(`/processes`)
            .then(response => {
                setProcesses(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        if(filterByProcess != "All"){
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
                    data: document.published ? document["release-date"] : 'Não foi publicado',
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
                    title: "Código",
                    column: "codigo",
                },
                {
                    title: "Título",
                    column: "titulo",
                },
                {
                    title: "Data da Publicação",
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
                caption="Abaixo está a lista contendo a apresentação dos nossos documentos"
            />
            <PageContent>
                <SearchBar function={searchDocument}/>
                <SelectFilter selectItems={processes} inicialValue={filterByProcess} function={setFilterByProcess}></SelectFilter>
                {documents && documents.length > 0 ? renderDocumentsTable() : <p>Informação não encontrada</p>}
            </PageContent>
        </>
    )
}