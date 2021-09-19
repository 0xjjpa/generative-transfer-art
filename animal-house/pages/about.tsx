import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Head from "../components/head";
import introduction from "../content/introduction.md";
import { media } from '../styles/mixins'

import Markdown from "../components/Markdown";
import { PageWrapper } from "../styles/components";

const Image = styled.img`
  padding: 40px;
  width: 150px;
  ${media.laptop`
    width: 300px;
  `}
`;

export default function About() {
  return (
    <>
      <Head title={"About"} />
      <PageWrapper>
        <div
          css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {["cat", "bunny", "mouse", "skull", "unicorn", "creator"].map(
            (img) => (
              <Image
                src={`./images/${img}.svg`}
              />
            )
          )}
        </div>
        <article
          css={[
            css`
              padding: 2vw;
            `,
          ]}
        >
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Markdown markdown={introduction} />
          </div>
        </article>
      </PageWrapper>
    </>
  );
}
