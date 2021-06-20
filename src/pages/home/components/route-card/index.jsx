import React from 'react';

import { Card, CardTitle, CardText, Button } from 'reactstrap';

const RouteCard = ({ title, caption, actionText, route, disabled }) => {
    return <Card body>
        <CardTitle tag="h4">
            {title}
        </CardTitle>
        <CardText>
            {caption}
        </CardText>
        <Button disabled={disabled} onClick={() => history.push(route)}>
            {actionText}
        </Button>
    </Card>
}

export default RouteCard;