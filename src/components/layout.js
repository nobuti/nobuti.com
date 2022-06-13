/** @jsxImportSource theme-ui */

import Link from "next/link";

import { FaTwitter as Twitter, FaGithub as GitHub } from "react-icons/fa";

const Component = (props) => {
  return (
    <div
      sx={{
        variant: "styles.root",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <header
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "wide",
          mx: "auto",
          px: 3,
          py: 4
        }}
      >
        <Link href="/" passHref>
          <a
            sx={{
              variant: "styles.navitem",
              mr: 3
            }}
          >
            Home
          </a>
        </Link>
        <Link href="/thoughts" passHref>
          <a
            sx={{
              variant: "styles.navitem",
              mr: 3
            }}
          >
            Thoughts
          </a>
        </Link>
        <Link href="/about" passHref>
          <a
            sx={{
              variant: "styles.navitem",
              mr: 3
            }}
          >
            About me
          </a>
        </Link>
      </header>
      <main
        sx={{
          width: "100%",
          maxWidth: "wide",
          px: 3,
          mx: "auto",
          flex: "1 1 auto"
        }}
      >
        {props.children}
      </main>
      <footer
        sx={{
          px: 3,
          py: 5,
          width: "100%",
          maxWidth: "wide",
          mx: "auto"
        }}
      >
        <div
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <a
            href="https://twitter.com/nobuti"
            title="Twitter"
            sx={{
              variant: "styles.navitem",
              mx: 3
            }}
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://github.com/nobuti"
            title="GitHub"
            sx={{
              variant: "styles.navitem"
            }}
          >
            <GitHub size={24} />
          </a>
        </div>
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            fontSize: 0
          }}
        >
          <Link href="/" passHref>
            <a
              sx={{
                variant: "styles.navitem",
                mr: 3
              }}
            >
              Home
            </a>
          </Link>
          <Link href="/thoughts" passHref>
            <a
              sx={{
                variant: "styles.navitem",
                mr: 3
              }}
            >
              Thoughts
            </a>
          </Link>
          <Link href="/about" passHref>
            <a
              sx={{
                variant: "styles.navitem",
                mr: 4
              }}
            >
              About me
            </a>
          </Link>
          <div sx={{ mx: "auto" }} />
          <div sx={{ my: 2 }}>© 2022 Buti</div>
        </div>
      </footer>
    </div>
  );
};

export default Component;
