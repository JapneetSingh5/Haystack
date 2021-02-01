import { useEffect, useState } from "react";
const Search = (term) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `http://localhost:9200/webpages/_search`
        // `localhost:9200{CONTEXT_KEY}&q=${term}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, [term]);
  return { data };
};

export default Search;
