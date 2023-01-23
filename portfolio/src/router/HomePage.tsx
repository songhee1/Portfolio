import axios from "axios";
import { useState, useEffect, useRef } from "react";
import spinner from "./spinner.gif";
const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = "hWIO-ETKuGA7ig29f6Mi3LRtezeOBWma-7iNphRyLM4";
  const getPhoto = async () => {
    await axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${pageNumber}&per_page=10`
      )
      .then((res) => {
        setPhotos([...photos, ...res.data]);
        console.log(res.data);
        setLoading((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };
  const loadMore = () => setPageNumber((prev) => prev + 1);
  const bottom = useRef<any>(undefined);
  useEffect(() => {
    getPhoto();
  }, [pageNumber]);
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(bottom.current);
    }
  }, [loading]);
  return (
    <div>
      <h1>Infinite scrolling react hooks</h1>
      {photos.map((photo, index) => (
        <div key={index}>
          <img src={photo.urls.small} alt=""></img>
        </div>
      ))}
      <img src={spinner} />
      <button ref={bottom} onClick={loadMore}>
        next photos
      </button>
    </div>
  );
};
export default HomePage;
