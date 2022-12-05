import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';
import { MasterList } from '.';
import api from '../../api';

let mockedDocuments = [
    {
        "id": 1,
        "code": "PO001",
        "title": "Safety and mission assurance",
        "active": true,
        "published": true,
        "release-date": "02/12/2019",
        "processes": [
            {
                "id": 1,
                "name": "Production"
            },
            {
                "id": 2,
                "name": "Quality Management"
            }
        ]
    },
    {
        "id": 2,
        "code": "PO002",
        "title": "Software assurance research program",
        "active": true,
        "published": true,
        "release-date": "12/12/2019",
        "processes": [
            {
                "id": 3,
                "name": "Sales"
            },
        ]
    }
]

describe('Masterlist', () => {
    let mock;
    let formatProcesses = (item1, item2) => {
        return item1 + ", " + item2
    };

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet(/.*\/documents.*/).reply(200, mockedDocuments)
    })

    it('should render page title', async () => {
        render(<MasterList />);

        expect(await screen.findByText("Lista de Documentos")).toBeInTheDocument();
    });

    it('should render searchbar', async () => {
        render(<MasterList/>);

        expect(await screen.findByTestId("searchbar")).toBeInTheDocument();
    });

    it('should render list header', async () => {
        render(<MasterList />);

        expect(await screen.findByText("Código")).toBeInTheDocument();
        expect(await screen.findByText("Título")).toBeInTheDocument();
        expect(await screen.findByText("Data da Publicação")).toBeInTheDocument();
        expect(await screen.findByText("Processos")).toBeInTheDocument();
    });

    it('should render list items', async () => {
        let process;

        render(<MasterList />);
    
        expect(await screen.findByText(mockedDocuments[0].code)).toBeInTheDocument();
        expect(await screen.findByText(mockedDocuments[1].code)).toBeInTheDocument();
        expect(await screen.findByText(mockedDocuments[0].title)).toBeInTheDocument();
        expect(await screen.findByText(mockedDocuments[1].title)).toBeInTheDocument();
        expect(await screen.findByText(mockedDocuments[0]['release-date'])).toBeInTheDocument();
        expect(await screen.findByText(mockedDocuments[1]['release-date'])).toBeInTheDocument();

        process = formatProcesses(mockedDocuments[0].processes[0].name, mockedDocuments[0].processes[1].name);
        expect(await screen.findByText(process)).toBeInTheDocument();

        expect(await screen.findByText(mockedDocuments[1].processes[0].name)).toBeInTheDocument();
    });

    it('should render list pagination', async () => {
        render(<MasterList />);

        expect(await screen.findByText("Anterior")).toBeInTheDocument();
        expect(await screen.findByText("Próxima")).toBeInTheDocument();
        expect(await screen.findByText("1 / 1")).toBeInTheDocument();
    });
});