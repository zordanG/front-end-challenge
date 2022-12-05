import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/page-header';
import PageContent from '../../components/page-content';
import Table from '../../components/table';
import api from '../../api';
import './index.css';
import { SearchBar } from '../../components/search-bar';
import { useHistory } from 'react-router-dom';

export const MasterList = () => {
    const [documents, setDocuments] = useState({});
    const [processes, setProcesses] = useState([]);
    let tableRows = [];
    let history = useHistory();
    
    useEffect(() => {
        api.get(`/documents`)
            .then(response => setDocuments(response.data))
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        api.get(`/processes`)
            .then(response => {
                setProcesses(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    function searchDocument(search) {
        search = search.trim();
        api.get(`/documents?q=${search}`)
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => console.log(error));
    }

    function makeTableRows() {
        documents.map((document) => {
            let processesList = [];
            let listLength = 0;

            document.processes.map((processo) => {
                processesList.push(processo.name + ", ");
            })

            listLength = processesList.length - 1;
            processesList[listLength] = processesList[listLength].replace(", ", " ");
            
            tableRows.push(
                {
                    codigo: document.code,
                    titulo: document.title,
                    data: document.published ? document["release-date"] : 'Não foi publicado',
                    processos: processesList,
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
                {/* <form>
                    <select name="processos">
                        {processes && processes.map((process) => {
                                return <option key={}>{process.name}</option>})
                        }
                    </select>
                </form> */}
                {documents && documents.length > 0 ? renderDocumentsTable() : <p>Informação não encontrada</p>}
            </PageContent>
        </>
    )
}