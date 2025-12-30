import { useState } from 'react';
import './styles/App.css';
import { Button, vars } from '@azit/design-system';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Web</h2>
      <Button
        label={`count is ${count}`}
        onClick={() => setCount((count) => count + 1)}
      />
      <p style={{ color: vars.colors.blue40 }}>
        Available to use design system in the web app.
      </p>
    </>
  );
}

export default App;
