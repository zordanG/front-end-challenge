import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SelectFilter } from '.';
import AxiosMockAdapter from 'axios-mock-adapter';
import api from '../../api';

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

describe('SelectFilter', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet(/.*\/processes.*/).reply(200, processes);
    })

    it('should render SelectFilter', () => {
        render(<SelectFilter selectItems={processes} inicialValue={"All"} function={() => {}}/>);
        
        expect(screen.queryByTestId("selectfilter")).toBeInTheDocument();
    })

    it('should return the option onChange', async () => {
        let finalText = "All";

        render(<SelectFilter selectItems={processes} inicialValue={finalText} function={(selection) => finalText = selection}/>);

        expect(finalText).toBe("All");
        fireEvent.change(screen.getByTestId("selectfilter"), {target: {value: "Sales"}});
        expect(finalText).toBe("Sales");
    })

});