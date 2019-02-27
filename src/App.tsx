import React, {useEffect, useState} from 'react';

const App = () => {
  const [text, setText] = useState('');
  const value = useDebounce(text, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [artists, setArtists] = useState([] as Video[]);

  useEffect(() => {
    if (value) {
      setIsSearching(true);
      searchVideos(value).then(videos => {
        setIsSearching(false);
        setArtists(videos);
      });
    }
  }, [value]);

  return (<div>
    <input value={text} onChange={e => setText(e.target.value)} type="text" style={{width: '100%'}}/>
    {
      isSearching && 'Searching...'
    }
    {
      artists.map(a => <div key={a.id}>{a.text}</div>)
    }
    {/*<Sandbox/>*/}
  </div>);
};

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}


interface Video {
  text: string;
  id: string;
}

const searchVideos = (term: string): Promise<Video[]> =>
  new Promise(resolve => {
    const videos: Video[] = [
      {id: 'Result 1' + term, text: 'Result 1' + term},
      {id: 'Result 2' + term, text: 'Result 2' + term},
      {id: 'Result 3' + term, text: 'Result 3' + term},
    ];
    setTimeout(() => resolve(videos), 2000);
  });

export default App;

