import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '.';

describe('SearchBar', () => {

    it('should render searchbar', () => {
        render(<SearchBar />);
        
        expect(screen.queryByTestId("searchbar")).toBeInTheDocument();
    })

    it('should return the text onClick', async () => {
        let finalText = "";

        render(<SearchBar function={(text) => finalText = text}/>);

        fireEvent.change(screen.getByPlaceholderText("Pesquisa..."), {target: { value: "ASD"}})
        expect(finalText).toBe("");
        fireEvent.click(screen.getByTestId("search"));
        expect(finalText).toBe("ASD");
    })

});