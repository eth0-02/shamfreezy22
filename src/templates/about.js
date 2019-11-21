import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Cover from '../components/Cover'
import Image from '../components/Image'
import ContentWrapper from '../components/ContentWrapper'
import { Grid, Column } from '../components/Grid'
import { H1 } from '../components/Text'
import RichText from '../components/RichTextContentful'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function About({ data }) {
  const { excerpt, image, body } = data.page
  const hasCover = !!image

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero md={6} pb={hasCover ? undefined : 0} keepContentMargin={!hasCover}>
        {excerpt && <H1>{excerpt.excerpt}</H1>}
      </Hero>
      {hasCover && (
        <Cover>
          <Image fluid={image.childImageSharp.fluid} alt="" />
        </Cover>
      )}
      {body && (
        <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
          <ContentWrapper>
            <Grid>
              <Column md="8">
                <RichText document={body.json} />
              </Column>
            </Grid>
          </ContentWrapper>
        </Section>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    page: contentfulPages(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      id
      title
      slug
      excerpt {
        excerpt
      }
      body {
        json
      }
      seoTitle
      seoDescription {
        seoDescription
      }
      seoImage {
        og: resize(width: 1200, height: 630, quality: 80) {
          src
        }
      }
    }
  }
`
