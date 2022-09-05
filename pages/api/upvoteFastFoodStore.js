import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../lib/firebase";

const upvoteFastFoodStore = async (req, res) => {
  const { id } = req.query;
  const voteDocRef = doc(db, "fastfoodStores", id);
  if (!id) {
    res.status(400).json({ message: "Missing id" });
  } else {
    if (id.length !== 24) {
      res.status(400).json({ message: "Wrong id" });
    } else {
      try {
        await runTransaction(db, async (transaction) => {
          const voteDoc = await transaction.get(voteDocRef);
          if (!voteDoc.exists()) {
            throw "Document does not exist!";
          }

          const plusOneVotes = voteDoc.data().votes + 1;
          transaction.update(voteDocRef, { votes: plusOneVotes });
          res.status(200);
          res.json({
            message: `Transaction successfully committed! Votes increased to: ${plusOneVotes}`,
          });
        });
      } catch (e) {
        console.log("Transaction failed: ", e);
        res.status(500).json({ message: "Something went wrong", e });
      }
    }
  }
};

export default upvoteFastFoodStore;
