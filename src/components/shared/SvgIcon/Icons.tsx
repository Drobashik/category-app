import { ComponentProps, FunctionComponent } from "react";

export const PlusSVG = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12H20M12 4V20"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditSVG = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CrossSVG: FunctionComponent<ComponentProps<"svg">> = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(45deg)" }}>
      <path
        d="M4 12H20M12 4V20"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ConfirmSVG = () => {
  return (
    <svg viewBox="0 -0.5 25 25" fill="none">
      <path
        d="M5.5 12.5L10.167 17L19.5 8"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CenterSVG = () => {
  return (
    <svg fill="#000000" viewBox="0 0 492.589 492.589">
      <g>
        <path d="M468.467,222.168h-28.329c-9.712-89.679-80.46-161.18-169.71-172.258V24.135c0-13.338-10.791-24.134-24.134-24.134   c-13.311,0-24.117,10.796-24.117,24.134V49.91C132.924,60.988,62.177,132.488,52.482,222.168H24.153   C10.806,222.168,0,232.964,0,246.286c0,13.336,10.806,24.132,24.153,24.132h29.228c12.192,86.816,81.551,155.4,168.797,166.229   v31.804c0,13.336,10.806,24.135,24.117,24.135c13.343,0,24.134-10.799,24.134-24.135v-31.804   c87.228-10.829,156.607-79.413,168.775-166.229h29.264c13.33,0,24.122-10.796,24.122-24.132   C492.589,232.964,481.797,222.168,468.467,222.168z M246.294,398.093c-85.345,0-154.804-69.453-154.804-154.813   c0-85.363,69.459-154.813,154.804-154.813c85.376,0,154.823,69.45,154.823,154.813   C401.117,328.639,331.671,398.093,246.294,398.093z" />
        <path d="M246.294,176.93c-36.628,0-66.34,29.704-66.34,66.349c0,36.635,29.711,66.349,66.34,66.349   c36.66,0,66.34-29.713,66.34-66.349C312.634,206.635,282.955,176.93,246.294,176.93z" />
      </g>
    </svg>
  );
};

export const SVGArrowDown = () => {
  return (
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
        fill="#0F0F0F"
      />
    </svg>
  );
};

export const CollapseSVG: FunctionComponent<ComponentProps<"svg">> = (
  props
) => {
  return (
    <svg {...props} viewBox="0 0 16 16" fill="#000000">
      <path d="M9 9H4v1h5V9z" />
      <path d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z" />
    </svg>
  );
};

export const EyeSVG = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
