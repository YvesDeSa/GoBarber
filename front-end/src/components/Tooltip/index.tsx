import React from "react";
import { Container } from "./style";

interface ITooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

export { Tooltip };