import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import Section from './Section'
import { ScrollToTopButton } from './Button'
import { footerNavigation } from '../routes'
import { colors, breakpoints, fluidRange, vw } from '../style'
import { formatPhone } from '../lib/format'
import useSiteSettings from '../lib/useSiteSettings'
import { getActiveLangPath } from './SelectLanguage'

const CopyrightText = styled(Text)`
  font-size: ${fluidRange({ min: 10, max: 14 })};

  @media ${breakpoints.medium} {
    font-size: max(${vw(12)}, 8px);
  }
`

const currentYear = new Date().getFullYear()

export default function Footer() {
  const siteSettings = useSiteSettings()

  return (
    <Section as="footer" bg={colors.dark} py={[4, 7]}>
      <Grid>
        {siteSettings.offices.map(office => (
          <Column md="3" key={office.city}>
            <Text as="address" textColor="white">
              {office.address} <br />
              {office.zipcode} {office.city} <br />
              <Link
                href={`tel:${formatPhone(office.phone)}`}
                colorVariant="white"
              >
                {office.phone}
              </Link>
            </Text>
          </Column>
        ))}
        <Column md="3">
          <Text>
            <Link
              href={siteSettings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
            >
              Instagram
            </Link>
            <br />
            <Link
              href={siteSettings.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
            >
              Facebook
            </Link>
            <br />
            <Link
              href={siteSettings.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
            >
              LinkedIn
            </Link>
            <br />
            <Link
              href={siteSettings.social.github}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
            >
              GitHub
            </Link>
            <br />
          </Text>
        </Column>
        <Column md="3">
          <Text as="ul">
            {footerNavigation.map(route => (
              <li key={route.link}>
                <Link
                  to={getActiveLangPath() + route.link}
                  colorVariant="white"
                >
                  {getActiveLangPath() ? route.sv.title : route.title}
                </Link>
              </li>
            ))}
          </Text>
        </Column>
      </Grid>
      <Grid justifyContent="space-between" alignItems="flex-end" mt="4">
        <Column width="auto">
          <CopyrightText as="small" textColor="white">
            © {currentYear} <br />
            {siteSettings.name} <br />
            {getActiveLangPath() ? 'En del av ' : 'A part of '}
            <Link
              href="//diplomatgruppen.se"
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
            >
              {getActiveLangPath() ? 'Diplomat Gruppen' : 'Diplomat Group'}
            </Link>
          </CopyrightText>
        </Column>
        <Column width="auto">
          <ScrollToTopButton textColor="white" />
        </Column>
      </Grid>
    </Section>
  )
}
