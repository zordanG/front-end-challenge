import '@testing-library/jest-dom';
import {  } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';
import api from '../../api';

var mockedDocuments = [
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

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet(/.*\/documents.*/).reply(200, mockedDocuments)
    })

    it('should render page title', () => {
        //render(<>);
        //expect(screen.getByText("Master List")).toBeInTheDocument()
    });
});