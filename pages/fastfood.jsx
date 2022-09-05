import { fetchFastFoodStores } from "../lib/foursquare";
import { useState, useEffect } from "react";

import FastFoodCard from "../components/FastFoodCard";

import { useSelector, useDispatch } from "react-redux";

import { setFetchedStores, setNearby } from "../redux/slices/fastfoodSlice";
import { setLatLong } from "../redux/slices/latLongSlice";

export async function getStaticProps(context) {
  const storesByLocation = await fetchFastFoodStores(
    "40.748627838930304,-73.98528717577388",
    "30" //Starting location: NYC
  );
  return {
    props: {
      fastfoodStores: storesByLocation,
    }, // will be passed to the page component as props
  };
}

const Fastfood = (props) => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.fastfood.fetchedStores);
  const nearby = useSelector((state) => state.fastfood.nearby);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If there are no stores in redux, get them from initial props
    if (stores.length > 0) {
      //We have some stores in redux. Nothing to do.
    } else {
      dispatch(setFetchedStores(props.fastfoodStores));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("stores are: ", stores);
  }, [stores]);

  // Get location data from browser
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const actualPosition = `${position.coords.latitude},${position.coords.longitude}`;
        dispatch(setLatLong(actualPosition));

        console.log("latLong aquired!", actualPosition);
        fetchNearbyStores(actualPosition);
      },

      function (error) {
        console.log("Error getting location", error);
        alert(`Error (${error.code}) getting location.  ${error.message}.`);
      }
    );
  };

  const fetchNearbyStores = async (latLong) => {
    setLoading(true);
    const fetchedStores = await fetch(
      `/api/getFastFoodStoresByLocation?latLong=${latLong}&limit=15`
    );
    const response = await fetchedStores.json();
    dispatch(setFetchedStores(response));
    dispatch(setNearby(true));
    setLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center dark:bg-gradient-to-b from-gray-900 to-gray-800">
      <button
        onClick={getLocation}
        className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded my-8 w-60"
      >
        {loading ? "Loading..." : "View Fastfoods nearby"}
      </button>
      <h2 className="text-xl">{`${
        nearby ? "Nearby" : "New York"
      } Fastfood Stores`}</h2>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {stores && stores.length === 0 ? (
          <p className="text-center">Loading...</p>
        ) : (
          stores &&
          stores.map((store, idx) => {
            return <FastFoodCard key={idx} store={store} />;
          })
        )}
      </div>
    </div>
  );
};

export default Fastfood;
