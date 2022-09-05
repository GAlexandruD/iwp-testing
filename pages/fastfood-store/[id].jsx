import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedStore,
  setSelectedStoreVotes,
} from "../../redux/slices/fastfoodSlice";
import fastFoodGenericPicture from "../../public/static/pngwing.com.png";
import Tooltip from "../../components/Tooltip";
import useSWR from "swr";

// Import Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { fetchOneFastFoodStore } from "../../lib/foursquare";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export async function getStaticProps(staticProps) {
  // Fetch fastfood store data from Foursquare
  const findFastfoodStoreById = await fetchOneFastFoodStore(
    staticProps.params.id
  );

  // Check if the store exists in the database
  if (findFastfoodStoreById) {
    const docRef = doc(db, "fastfoodStores", staticProps.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("The fastfood store exists in the database");
    } else {
      try {
        const createdAt = new Date();
        await setDoc(docRef, {
          votes: 0,
          createdAt: createdAt.toISOString(),
        });
      } catch (error) {
        console.log("Error creating user.", error);
      }
    }
  }

  return {
    props: {
      fastfoodStore: findFastfoodStoreById ? findFastfoodStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "4a96bf8ff964a520ce2620e3" } }],
    fallback: true, // can also be true or 'blocking'
  };
}

const FastfoodStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  const [votes, setVotes] = useState(0);
  const [fastfoodStore, setFastfoodStore] = useState(
    initialProps.fastfoodStore || {}
  );

  const selectedStore = useSelector(
    (store) => store.fastfood.selectedStore || {}
  );
  const selectedStoreVotes = useSelector(
    (store) => store.fastfood.selectedStoreVotes || 0
  );

  useEffect(() => {
    if (id) {
      //Check if store is in redux state
      if (selectedStore && selectedStore.fsq_id === id) {
        setFastfoodStore(selectedStore);
      } else {
        // Store not in redux; Fetch it and dispatch it
        fetch(`/api/getFastFoodStoreById?id=${id}`).then((res) => {
          res.json().then((data) => {
            dispatch(setSelectedStore(data));
            setFastfoodStore(data);
            dispatch(setSelectedStoreVotes(0));
          });
        });
      }
    }
  }, [id]);

  const handleUpvote = async (id) => {
    await fetch(`/api/upvoteFastFoodStore?id=${id}`);
  };

  // fetcher function for useSWR
  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { data, error } = useSWR(
    id ? `/api/getFastFoodStoreVotes?id=${id}` : null,
    fetcher
  );

  useEffect(() => {
    // If there are votes fetched from the api, set them in the redux state
    if (data && data !== 0) {
      setVotes(data);

      //Update the votes if needed
      if (selectedStoreVotes[id] !== data) {
        dispatch(setSelectedStoreVotes({ [id]: data }));
      }
    } else if (
      selectedStoreVotes &&
      //Check if there is data in redux store and if the id of the data is equal to our id
      Object.keys(selectedStoreVotes)[0] === id
    ) {
      console.log("I have found votes in redux state");
      setVotes(selectedStoreVotes[id]);
    } else {
      console.log("No votes found");
      // If there are no votes fetched from the api, set the votes in the redux state to 0

      if (selectedStoreVotes[id] !== 0) {
        dispatch(setSelectedStoreVotes({ [id]: 0 }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedStoreVotes, id]);

  if (router.isFallback) {
    return <div className="text-center text-3xl">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center p-8">
      <div className="flex flex-col items-center overflow-hidden">
        <Link href="/fastfood">
          <a className="w-full ml-8 my-2 text-4xl text-left">← Go Back</a>
        </Link>
        <h1 className="text-3xl pb-4 text-sky-800 dark:text-sky-200">
          {fastfoodStore.name}
        </h1>
        <div className="flex justify-center mx-2 my-8">
          {fastfoodStore && fastfoodStore.photos?.length > 0 ? (
            <Swiper className="max-w-[400px]" modules={[Navigation]} navigation>
              {fastfoodStore.photos.map((photo, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    as="img"
                    priority
                    alt="fast-food store"
                    src={photo}
                    layout="fixed"
                    width={400}
                    height={400}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Image
              as="img"
              priority
              alt="fast-food store"
              src={fastFoodGenericPicture}
              layout="fixed"
              width={300}
              height={300}
              className="bg-gray-300 rounded-full dark:bg-transparent dark:rounded-none dark:opacity-50"
            />
          )}
        </div>

        <div className="flex items-center">
          <h1 className="text-3xl">
            ⭐ <span className="text-2xl mr-6">{votes}</span>
          </h1>
          <Tooltip message={"Vote"}>
            <button
              className="text-2xl"
              onClick={(e) => {
                handleUpvote(id);
                Router.reload(window.location.pathname); //Reloads the page so it will show the vote.
              }}
            >
              👍
            </button>
          </Tooltip>
        </div>

        <h3 className="text-xl p-4">
          Address:{" "}
          <span className="text-sky-700 dark:text-sky-400">
            {fastfoodStore.location?.formatted_address +
              ", " +
              fastfoodStore.location?.country}
          </span>
        </h3>

        <div className="flex">
          {fastfoodStore.categories?.map((category) => {
            return (
              <div className="relative" key={category.id}>
                <Tooltip message={category.name}>
                  <div className="flex flex-col items-center group">
                    <Image
                      layout="fixed"
                      src={`${category.icon.prefix}32${category.icon.suffix}`}
                      alt={category.name}
                      className="ml-2 bg-gray-500 dark:bg-transparent dark:opacity-70"
                      width={32}
                      height={32}
                    />
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FastfoodStore;
