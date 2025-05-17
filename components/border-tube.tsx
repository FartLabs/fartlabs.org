import { DIV } from "@fartlabs/htx/div";

export interface BorderTubeProps
  extends Exclude<Parameters<typeof DIV>[0], undefined> {
  color: TubeColor;
  glow?: boolean;
}

export type TubeColor =
  | "blue"
  | "turquoise"
  | "purple"
  | "yellow"
  | "magenta"
  | "green"
  | "orange";

export function BorderTube(props: BorderTubeProps) {
  const className = `border-tube-${props.color}${props.glow ? " glow" : ""}`;
  return (
    <DIV
      {...props}
      class={`${className}${props.class ? ` ${props.class}` : ""}`}
    >
      {props.children.join("")}
    </DIV>
  );
}
