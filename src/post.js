/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

const Draft = () => (
  <div
    sx={{
      my: 4,
      fontWeight: "bold",
      color: "primary",
    }}
  >
    You are viewing an draft post, and this may not be ready for primetime.
  </div>
);

export default ({ title, date, draft, children, location, ...props }) => (
  <div
    sx={{
      maxWidth: "container",
    }}
  >
    {draft && <Draft />}
    <Styled.h1>{title}</Styled.h1>
    <div
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div sx={{ variant: "type.small", mr: 3 }}>{date}</div>
    </div>
    <article>{children}</article>
  </div>
);
