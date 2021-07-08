import React from 'react';

import { Row, Col } from 'reactstrap';

import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import RouteCard from './components/route-card';

export const Home = () => {
    return (
        <>
            <PageHeader
                title="Inicio"
                caption="Aqui você pode navegar para outras funções do sistema"
            />
            <PageContent>
                <Row gutter={8}>
                    <Col style={{ marginBottom: '24px' }} sm={6} md={6} lg={4}>
                        <RouteCard
                            title="Master List"
                            caption="Ver listagem de documentos"
                            actionText="Ir"
                            route="/list"
                        />
                    </Col>
                    <Col style={{ marginBottom: '24px' }} sm={6} md={6} lg={4}>
                        <RouteCard
                            title="Criar Documento"
                            caption="Inserir novo documento"
                            actionText="Ir"
                            disabled
                        />
                    </Col>
                    <Col style={{ marginBottom: '24px' }} sm={6} md={6} lg={4}>
                        <RouteCard
                            title="Relatórios"
                            caption="Ver relatórios do documento"
                            actionText="Ir"
                            disabled
                        />
                    </Col>
                </Row>
            </PageContent>
        </>
    )
}
