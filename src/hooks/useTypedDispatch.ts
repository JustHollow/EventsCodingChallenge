import { useDispatch } from "react-redux";
import { StoreDispatch } from "@store";

/**
 * Same as `useDispatch` but with enchanced types like thunk and etc from `StoreDispatch`
 */
export const useTypedDispatch = () => useDispatch<StoreDispatch>();

export default useTypedDispatch;
