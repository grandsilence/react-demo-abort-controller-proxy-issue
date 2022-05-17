import { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);
  const [abortControllers, setAbortControllers] = useState([]);
  const apiUrl = '/api/test';

  const axiosRequest = () => {
    const abortController = new AbortController();
    return [
      axios.get(apiUrl, { signal: abortController.signal }).then((res) => res.data),
      abortController,
    ];
  };

  const fetchRequest = () => {
    const abortController = new AbortController();
    return [
      fetch(apiUrl, { signal: abortController.signal }).then((result) => result.text()),
      abortController,
    ];
  };

  const handleRequest = (requestMethod) => {
    setResponse(null);
    const [requestPromise, abortController] = requestMethod();
    requestPromise
      .then((result) => {
        setResponse(result);
      })
      .catch((e) => console.log(e));

    setAbortControllers((old) => [abortController, ...old]);
  };

  const handleCancelAll = () => {
    abortControllers.forEach((abortController) => {
      abortController.abort();
    });
  };

  return (
    <>
      <div>{response}</div>
      <div>
        <button onClick={() => handleRequest(axiosRequest)}>Axios Fetch +1</button>
        <button onClick={() => handleRequest(fetchRequest)}>Native Fetch +1</button>
      </div>
      <button onClick={handleCancelAll}>Cancel All</button>
    </>
  );
}

export default App;
