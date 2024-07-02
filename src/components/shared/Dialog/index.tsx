import { FunctionComponent, useLayoutEffect, useRef } from "react";
import { Button } from "../Button";
import classNames from "classnames";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

export const Dialog: FunctionComponent<Props> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={classNames("dialog_backdrop", {
          "dialog_backdrop--open": isOpen,
        })}
      />
      <dialog className="dialog" ref={dialogRef}>
        <div className="dialog_backdrop-click-area" onClick={onClose} />

        <div className="dialog_container">
          <header className="dialog_header">
            <h1>{title}</h1>

            <Button className="dialog_cross" onClick={onClose}>
              &#x2715;
            </Button>
          </header>

          <main className="dialog_main">{children}</main>
        </div>
      </dialog>
    </>
  );
};
