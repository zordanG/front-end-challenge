import React from 'react';
import { Card, CardSubtitle, CardText, CardHeader } from 'reactstrap';
import './index.css'

const DocumentCard = ({ code, title, published, releaseDate, active, processes }) => {

    return <Card className='text-center'>
        <CardHeader tag="h3">
            Documento: {code}
        </CardHeader>
        <CardSubtitle>
            <h5>Título</h5>
        </CardSubtitle>
        <CardText>
            {title}
        </CardText>
        <CardSubtitle>
            <h5>Publicado</h5>
        </CardSubtitle>
        <CardText>
            {published ? "Publicado" : "Não publicado"}
        </CardText>
        <CardSubtitle>
            <h5>Data de publicação</h5>
        </CardSubtitle>
        <CardText>
            {releaseDate? releaseDate : 'Não foi publicado'}
        </CardText>
        <CardSubtitle>
            <h5>Situação</h5>
        </CardSubtitle>
        <CardText>
            {active ? "Ativo" : "Inativo"}
        </CardText>
        <CardSubtitle>
            <h5>Processos</h5>
        </CardSubtitle>
        <CardText>
            {processes}
        </CardText>
    </Card>
}

export default DocumentCard;