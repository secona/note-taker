import React from 'react';
import NoteGrid from './components/NoteGrid';

const App: React.FC = () => {
  return (
    <>
      <NoteGrid 
        notes={[
          {title: 'Hello', preview: 'Hello World'},
          {title: 'Hello', preview: 'Hello World'},
          {title: 'Hello', preview: 'Hello World'},
          {title: 'Hello', preview: 'Hello World'},
          {title: 'Hello', preview: 'Hello World'},
        ]}
      />
    </>
  );
}

export default App;
