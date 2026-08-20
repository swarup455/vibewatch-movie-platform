import { Router} from "express"
import { authenticate } from "../../middlewares/authMiddleware.js";
import { fetchMovieById, fetchMovies } from "./discoverController.js";

const router = Router();

router.get("/fetch-movies", authenticate, fetchMovies);
router.get("/movie/:id", authenticate, fetchMovieById);

export default router;