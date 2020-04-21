import React from 'react';
import { Input, Button, Buttons, Form, Control } from './form';

export default { title: 'Forms' };

export const BasicInput = () => (
  <Input />
);


export const BasicButton = () => (
  <Buttons align='left'>
    <Button>Default</Button>
    <Button variant='primary'>Primary</Button>
  </Buttons>
);


export const BasicControl = () => (
  <Form>
    <Control label='Name'>
      <Input />
    </Control>
    <Control label='Occupation'>
      <Input />
    </Control>
  </Form>
);

export const HeaderControl = () => (
  <Form magnitude='header'>
    <Control label='Name'>
      <Input />
    </Control>
    <Control label='Occupation'>
      <Input />
    </Control>
  </Form>
);


export const FormBig = () => (
  <Form maxWidth={300} magnitude='header'>
    <Control label='Name'>
      <Input />
    </Control>
    <Control label='Occupation'>
      <Input />
    </Control>
    <Buttons>
      <Button display='block' variant='primary'>Go!</Button>
    </Buttons>
  </Form>
);

export const FormLittle = () => (
  <Form maxWidth={300}>
    <Control label='Name'>
      <Input />
    </Control>
    <Control label='Occupation'>
      <Input />
    </Control>
    <Buttons>
      <Button>Concel</Button>
      <Button variant='primary'>Submit</Button>
    </Buttons>
  </Form>
);
