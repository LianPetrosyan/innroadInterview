import { useEffect, useState } from 'react';

export default () => {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    document.getElementById('uuid').addEventListener('click', () => {
      alert(`You clicked on the element: ${uuid}`);
    });
    // NOTE: in this app 'uuid' changes everytime the table (PostsTable) receives new records
  }, [uuid]);

  return [uuid, setUuid];
};
