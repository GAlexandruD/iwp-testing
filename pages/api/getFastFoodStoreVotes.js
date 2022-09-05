import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const getFastFoodStoreVotes = async (req, res) => {
  const { id } = req.query;

  // If id is undefined, return 0
  if (typeof id === "undefined") {
    console.log("id is undefined");
    res.status(400).json(0);
  }

  //If id does not exists, return 0
  if (!id) {
    console.log("No id provided");
    res.status(400).json(0);
  } else {
    if (id.length !== 24) {
      console.log("Invalid id");
      res.status(400).json(0);
    } else {
      try {
        const docRef = doc(db, "fastfoodStores", id);
        const docSnap = await getDoc(docRef);
        const votes = await docSnap.data().votes;
        res.status(200).json(votes);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
      }
    }
  }
};

export default getFastFoodStoreVotes;
