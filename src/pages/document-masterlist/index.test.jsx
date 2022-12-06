import '@testing-library/jest-dom';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
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

        mock.onGet(/.*\/documents.*/).reply(200, mockedDocuments);
        mock.onGet(/.*\/processes.*/).reply(200, processes);
    })

    it('should render all the list', async () => {
        render(<MasterList />);

        expect(await screen.findByText("Lista de Documentos")).toBeInTheDocument();
        expect(screen.getByTestId("searchbar")).toBeInTheDocument();
        expect(screen.getByTestId("selectfilter")).toBeInTheDocument();
        expect(screen.getByTestId("masterlist")).toBeInTheDocument();
    });
});