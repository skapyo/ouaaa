import React from 'react';
import fs from 'fs';
import { withApollo } from 'hoc/withApollo.jsx';
import moment from 'moment';
import gql from 'graphql-tag';

const Sitemap = () => {};

const GET_ACTORS_SSR = `
query actors {
  actors {
    id
    name
    updatedAt
}
}
`;

const GET_EVENTS_SSR = `
query events {
  events {
    id
    label
    updatedAt
}
}
`;
const GET_CATEGORIES_SSR= `
query categories {
  categories {
    id
    label
    color
    description
    icon
  }
}`;
export const getServerSideProps = async ({ res }) => {
  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.js',
        '_document.js',
        '_error.js',
        'sitemap.xml.js',
        'forgotPassword.jsx',
        'styles.css',
        'index.jsx',
        'signin.jsx',
        'signup.jsx',
        'administration',
        'addevent',
        'addarticle',
        'addactor',
        'actorAdmin',
        'account',
        'emailValidation',
        'improvment',
        'user',
        'event',
        'agenda.jsx',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${process.env.NEXT_PUBLIC_BASE_URL}/${staticPagePath}`;
    });



  const getActor = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'actors',
      variables: {},
      query: GET_ACTORS_SSR,
    }),
  });

  const initialData = await getActor.json();
  if (initialData.errors) {
    console.error(
      ` Error fetching actor error message : ${
        initialData.errors[0].message
      }`,
    );
  }

  const getEvents = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'events',
      variables: {},
      query: GET_EVENTS_SSR,
    }),
  });
  const initialDataEvent = await getEvents.json();
  if (initialDataEvent.errors) {
    console.error(
      ` Error fetching event error message : ${
        initialDataEvent.errors[0].message
      }`,
    );
  }
  const getCategories = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'categories',
      variables: {},
      query: GET_CATEGORIES_SSR,
    }),
  });
  const initialDataCategories = await getCategories.json();
  if (initialDataCategories.errors) {
    console.error(
      ` Error fetching event error message : ${
        initialDataCategories.errors[0].message
      }`,
    );
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${process.env.NEXT_PUBLIC_BASE_URL}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_BASE_URL}/agenda</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_BASE_URL}/signin</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_BASE_URL}/forgotPassword</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
      ${staticPages
    .map((url) => {
      return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
    })
    .join('')}
  ${initialData.data.actors
    .map(({ id, updatedAt }) => {
      return `
          <url>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL}/actor/${id}</loc>
            <lastmod>${moment(parseInt(updatedAt)).format("YYYY-MM-DDTHH:mm:ss:SSS[Z]")}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>
        `;
    })
    .join('')}
    ${initialDataEvent.data.events
      .map(({ id, updatedAt }) => {
        return `
            <url>
              <loc>${process.env.NEXT_PUBLIC_BASE_URL}/event/${id}</loc>
              <lastmod>${moment(parseInt(updatedAt)).format("YYYY-MM-DDTHH:mm:ss:SSS[Z]")}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join('')}
      ${initialDataCategories.data.categories
        .map(({ id, updatedAt }) => {
          return `
              <url>
                <loc>${process.env.NEXT_PUBLIC_BASE_URL}/annuaire/${id}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default withApollo()(Sitemap);
