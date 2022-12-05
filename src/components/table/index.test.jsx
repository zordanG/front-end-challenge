import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';
import Table from '.';
import api from '../../api';

let mockedDocuments = [
    {
        codigo: "PO001",
        title: "Safety and mission assurance",
        onClick: () => {
            let aux = document.getElementById("clicked");
            aux.textContent = "Cliquei 1"
        }
    },
    {
        codigo: "PO002",
        title: "Software assurance research program",
        onClick: () => {
            let aux = document.getElementById("clicked");
            aux.textContent = "Cliquei 2"
        }
    },
    {
        codigo: "PO003",
        title: "Administrative controls",
        onClick: () => {
            let aux = document.getElementById("clicked");
            aux.textContent = "Cliquei 3"
        }
    },
    {
        codigo: "PO004",
        title: "Document control",
        onClick: () => {
            let aux = document.getElementById("clicked");
            aux.textContent = "Cliquei 4"
        }
    },
]

describe('Table', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet(/.*\/documents.*/).reply(200, mockedDocuments)
    })

    it('should render table', async () => {

        render(<Table 
            header={[
                {
                    title: "Código",
                    column: "codigo",
                },
                {
                    title: "Título",
                    column: "title",
                },
            ]}
            rows={ mockedDocuments }
            itemsPerPage={3}/>);
        
        expect(await screen.findByText("Código")).toBeInTheDocument();
        expect(await screen.findByText("Título")).toBeInTheDocument();
        expect(await screen.findByText("PO001")).toBeInTheDocument();
        expect(await screen.findByText("Safety and mission assurance")).toBeInTheDocument();
        expect(await screen.findByText("PO002")).toBeInTheDocument();
        expect(await screen.findByText("Software assurance research program")).toBeInTheDocument();
        expect(await screen.findByText("PO003")).toBeInTheDocument();
        expect(await screen.findByText("Administrative controls")).toBeInTheDocument();
        expect(screen.queryByText("PO004")).not.toBeInTheDocument();
        expect(screen.queryByText("Document control")).not.toBeInTheDocument();
        expect(await screen.findByText("Anterior")).toBeInTheDocument();
        expect(await screen.findByText("Próxima")).toBeInTheDocument();
        expect(await screen.findByText("1 / 2")).toBeInTheDocument();
    })

    it('should execute function onClick', async () => {
        
        render(<Table 
            header={[
                {
                    title: "Código",
                    column: "codigo",
                },
                {
                    title: "Título",
                    column: "title",
                },
            ]}
            rows={ mockedDocuments }
            itemsPerPage={3}/>);
        render(<h1 id="clicked">Clicked</h1>);
        
        fireEvent.click(await screen.findByText("PO001"));
        
        expect(await screen.findByText("Cliquei 1")).toBeInTheDocument();
        expect(screen.queryByText("Clicked")).not.toBeInTheDocument();

        fireEvent.click(await screen.findByText("PO002"));
        
        expect(await screen.findByText("Cliquei 2")).toBeInTheDocument();
        expect(screen.queryByText("Cliquei 1")).not.toBeInTheDocument();
    })

});