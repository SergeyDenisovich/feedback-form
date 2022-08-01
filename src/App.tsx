import React, { useState } from 'react';
import { Form } from './components/Form/Form';
import { Preview } from './components/Preview/Preview';

const App = () => {
  const [isFormOpen, setOpenForm] = useState<boolean>(false);

  const showForm = () => {
    setOpenForm(true);
  };

  return <div className='container'>{isFormOpen ? <Form /> : <Preview showForm={showForm} />}</div>;
};

export default App;
