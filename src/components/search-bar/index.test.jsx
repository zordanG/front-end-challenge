import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '.';

describe('SearchBar', () => {

    it('should render searchbar', async () => {
        render(<SearchBar />);
        
        expect(await screen.findByTestId("searchbar")).toBeInTheDocument();
    })

    it('should execute function onSubmit', async () => {
        let counter = 0;

        render(<SearchBar function={counter++}/>);
        fireEvent.submit(screen.getByPlaceholderText("Pesquisa..."));

        expect(counter).toBe(1);
    })

});