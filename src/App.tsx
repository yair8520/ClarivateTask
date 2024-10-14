import React from 'react';

import {HomePage} from './Pages';
import {HomeProvider} from './Context/HomeContext/HomeContext';

function App(): React.JSX.Element {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
}

export default App;
