import { SMALL } from "@fartlabs/htx/small";
import { Button } from "@fartlabs/css/button";

export interface OutboundButtonProps {
  content: string;
  href: string;
  outbound?: boolean;
}

export function OutboundButton(props: OutboundButtonProps) {
  return (
    <Button href={props.href} target={props.outbound ? "_blank" : undefined}>
      {props.content}
      {props.outbound && <Outbound />}
    </Button>
  );
}

export function Outbound() {
  return <SMALL>&#8599;</SMALL>;
}
