import { getActivePlaces } from "@/backend/services/places.service";
import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";

export async function GET() {
  try {
    const places = await getActivePlaces();
    return apiSuccess(places, "Places fetched successfully!");
  } catch (error) {
    return apiError("Unable to fetch places!", 500, getErrorMessage(error));
  }
}
