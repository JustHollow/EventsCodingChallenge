import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@store/ducks";

/**
 * Same as `useSelector` but with provided RootState type;
 */
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
