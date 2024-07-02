import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Position } from "../types/Position.type";

type PositionContextType = {
  elementPosition: Position;
  changeElementPosition: (x: number, y: number) => void;
};

const defaultValue = {
  elementPosition: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  changeElementPosition: () => {},
};

export const PositionContext = createContext<PositionContextType>(defaultValue);

export const PositionProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [elementPosition, setElementPosition] = useState(
    defaultValue.elementPosition
  );

  const changeElementPosition = useCallback((x: number, y: number) => {
    setElementPosition({ x, y });
  }, []);

  return (
    <PositionContext.Provider
      value={{
        elementPosition,
        changeElementPosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export const usePositionContext = () => useContext(PositionContext);
