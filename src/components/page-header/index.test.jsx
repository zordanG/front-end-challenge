import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageHeader from '.';

describe('Page Header', () => {
    it('should render header title text', async () => {
        render(<PageHeader title="Page title"/>);
        expect(await screen.findByText("Page title")).toBeInTheDocument();
    });

    it('should render header caption text', async () => {
        render(<PageHeader title="Page title" caption="Page title caption"/>);
        expect(await screen.findByText("Page title caption")).toBeInTheDocument();
    });
})