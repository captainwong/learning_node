import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class PersonalDetails extends React.Component{
    public render(): React.ReactNode {
        return (
            <Row>
                <Col lg="8">
                    <Row>
                        <Col><h4 className='mb-3'>Personal details</h4></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor='firstname'>First Name</label></Col>
                        <Col><label htmlFor='lastName'>Last Name</label></Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type='text' id='firstName' className='form-control' placeholder='First Name' />
                        </Col>
                        <Col>
                            <input type='text' id='lastName' className='form-control' placeholder='Last Name' />
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
        )
    }
}