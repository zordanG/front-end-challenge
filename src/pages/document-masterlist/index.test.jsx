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

let processes = [
    {
        "id": 1,
        "name": "Production"
    },
    {
        "id": 2,
        "name": "Quality Management"
    },
    {
        "id": 3,
        "name": "Sales"
    },
]

describe('Masterlist', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet("/documents").reply(200, mockedDocuments);
        mock.onGet("/documents?q=asd").reply(200, []);
        mock.onGet("/documents?q=sales").reply(200, [mockedDocuments[1]]);
        mock.onGet(/.*\/processes.*/).reply(200, processes);
    })

    it('should render all the list', async () => {
        render(<MasterList />);

        expect(await screen.findByText("Lista de Documentos")).toBeInTheDocument();
        expect(screen.getByTestId("searchbar")).toBeInTheDocument();
        expect(screen.getByTestId("selectfilter")).toBeInTheDocument();
        expect(screen.getByTestId("masterlist")).toBeInTheDocument();
    });
    
    it('should filter by selection', async () => {
        let items;

        render(<MasterList />);
        expect(await screen.findByText("Lista de Documentos")).toBeInTheDocument();
        
        items = await screen.findAllByRole(/item/i);
        expect(items.length).toBe(2);
        
        fireEvent.change(screen.getByTestId("selectfilter"), {target: {value: "Sales"}});
        items = await screen.findAllByRole(/item/i);
        expect(items.length).toBe(1);
    });
    
    it('should return a message if search is not found', async () => {
        render(<MasterList />);
        expect(await screen.findByText("Lista de Documentos")).toBeInTheDocument();
        
        fireEvent.input(await screen.findByPlaceholderText("Pesquisa..."), {target: {value: "asd"}});
        fireEvent.click(await screen.findByTestId("search"));
        
        expect(await screen.findByText("Informação não encontrada")).toBeInTheDocument();
    });
    
    //TODO: return search
    //TODO: onClick navigation
});