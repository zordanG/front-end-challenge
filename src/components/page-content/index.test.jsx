import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageContent from '.';

describe('Page Content', () => {
    it('should render page content', async () => {
        render(
            <PageContent>
                <button name="Test">
                    Test
                </button>
            </PageContent>
        );
        expect(await screen.findByRole("button", { name: "Test" })).toBeInTheDocument();
    });
})