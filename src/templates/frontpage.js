import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { H1, H2 } from '../components/Text'
import { Grid, CssGrid, Column } from '../components/Grid'
import Section from '../components/Section'
import Link from '../components/Link'
import Card from '../components/Card'
import Tile from '../components/Tile'
import Div from '../components/Div'
import Hero from '../components/Hero'
import InstagramFeed from '../components/InstagramFeed'
import { getActiveLangPath } from '../components/SelectLanguage'
import { colors, breakpoints, vw } from '../style'
import { routes } from '../routes'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function Index({ data }) {
  const { title } = data.contentfulPage

  const cases = [...data.cases.edges]
    .filter(
      (item, index, self) =>
        index === self.findIndex(t => t.node.id === item.node.id),
    )
    .slice(0, 5)

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage.page)}>
      <Hero scrollButtonElement="#case-section" pt={8}>
        <H1>{title}</H1>
      </Hero>
      <Section id="case-section" pt={[3, 4]} pb={[8, 16]}>
        <CaseGrid>
          {cases.map(({ node }) => (
            <Tile
              key={node.id}
              url={node.fields.slug}
              title={node.frontmatter.client}
              image={node.frontmatter.image}
              tags={node.frontmatter.tags}
              bg={node.frontmatter.color}
              mb="0"
            />
          ))}
        </CaseGrid>
        <Grid>
          <Column>
            <Div mt={[3, 6]}>
              <Link to={routes.work.link} colorVariant="dark" variant="large">
                More work
              </Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.ice} pt="0" pb={[5, 10]}>
        <Div halfTopBg="white" mb={[2, 4]}>
          <Grid>
            <Column>
              <H2>News</H2>
            </Column>
          </Grid>
        </Div>
        <Grid>
          {data.posts.edges.map(({ node }) => (
            <Column key={node.id} md="6" bottomGap>
              <Card
                date={node.createdAt}
                title={node.title}
                url={`${getActiveLangPath()}/${node.slug}`}
                image={node.featuredImage}
              />
            </Column>
          ))}
          <Column>
            <Div mt={[3, 2]}>
              <Link to={routes.news.link} variant="large">
                More news
              </Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.dark} pt="0" mt={[8, 24]} pb={[12, 36]}>
        <InstagramFeed />
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  fragment caseFields on Mdx {
    id
    fields {
      slug
    }
    frontmatter {
      client
      tags
      image {
        childImageSharp {
          ...TileImage
        }
      }
    }
  }
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulPages(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      title
      excerpt {
        excerpt
      }
      ...Meta
    }
    cases: allMdx(
      limit: 5
      filter: {
        fields: { template: { eq: "case" } }
        frontmatter: { published: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...caseFields
        }
      }
    }
    posts: allContentfulPosts(
      limit: 4
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          slug
          title
          createdAt
          featuredImage {
            fluid(quality: 80) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const CaseGrid = styled(CssGrid)`
  @media ${breakpoints.medium} {
    grid-auto-flow: row dense;
  }

  > * {
    @media ${breakpoints.medium} {
      grid-row: span 2;
      grid-column: grid-start / span 6;
    }
  }

  > *:nth-child(1),
  > *:nth-child(4),
  > *:nth-child(5) {
    @media ${breakpoints.medium} {
      grid-row: span 5;
      min-height: ${vw(752)};
    }
  }

  > *:nth-child(2),
  > *:nth-child(4) {
    @media ${breakpoints.medium} {
      grid-column-start: col-end 6;
    }
  }

  > *:nth-child(5) {
    grid-column: grid;
  }
`
